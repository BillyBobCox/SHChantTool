const fs = require('fs');
const path = require('path');

// Psalm tone definitions for different modes
const psalmTones = {
    I: {
        intonation: '(c4) ',
        recitingTone: 'f',
        mediation: 'g',
        termination: 'g',
        finalNote: 'g'
    },
    II: {
        intonation: '(c3) ',
        recitingTone: 'g',
        mediation: 'f',
        termination: 'g',
        finalNote: 'g'
    },
    // Add more modes here
};

// Function to split the text into two parts based on natural pauses
function splitText(verse) {
    // Try splitting by semicolon first, then comma, then space
    let parts = verse.split(';');
    if (parts.length === 1) parts = verse.split(',');
    if (parts.length === 1) parts = verse.split(/\s(?=\S*$)/); // Split on the last space
    return parts.map(part => part.trim());
}

// Function to apply the selected psalm tone to a verse
function applyPsalmTone(text, mode) {
    const verses = text.split('\n').filter(line => line.trim() !== '');
    const tone = psalmTones[mode];
    let gabcOutput = '%%\n';

    verses.forEach((verse, index) => {
        const [firstPart, secondPart] = splitText(verse);

        if (firstPart && secondPart) {
            // Apply intonation to the first part (only for the first verse)
            if (index === 0) {
                gabcOutput += `${tone.intonation}${firstPart.split(' ').slice(0, 2).join(`(${tone.recitingTone}) `)}(${tone.recitingTone}) `;
            }

            // Apply reciting tone to the rest of the first part
            const remainingFirstPart = firstPart.split(' ').slice(index === 0 ? 2 : 0).join(' ');
            gabcOutput += `${remainingFirstPart.split(' ').join(`(${tone.recitingTone}) `)}(${tone.recitingTone}) `;

            // Apply mediation
            const lastWordFirstPart = remainingFirstPart.split(' ').pop();
            gabcOutput += `${lastWordFirstPart}(${tone.mediation}) `;

            // Apply reciting tone to the second part
            gabcOutput += `${secondPart.split(' ').join(`(${tone.recitingTone}) `)}(${tone.recitingTone}) `;

            // Apply termination
            const lastWordSecondPart = secondPart.split(' ').pop();
            gabcOutput += `${lastWordSecondPart}(${tone.termination})\n`;
        }
    });

    return gabcOutput;
}

// Read the psalm text from "psalm.txt"
const inputFilePath = path.join(__dirname, 'psalm.txt');
fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // Prompt the user to select a psalm tone mode
    const mode = process.argv[2] || 'I'; // Default to Mode I if no argument is provided

    if (!psalmTones[mode]) {
        console.error('Invalid mode selected. Available modes are: I, II.');
        return;
    }

    // Apply the selected psalm tone to the text
    const gabcOutput = applyPsalmTone(data, mode);

    // Output the result to "psalm.gabc"
    const outputFilePath = path.join(__dirname, 'psalm.gabc');
    fs.writeFile(outputFilePath, gabcOutput, (err) => {
        if (err) {
            console.error('Error writing the file:', err);
        } else {
            console.log(`GABC output successfully written to psalm.gabc using Psalm Tone ${mode}`);
        }
    });
});
