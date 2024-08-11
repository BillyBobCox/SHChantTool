# The Sacred Heart Chant Tool
### Aka, the "I'm to lazy to write my own music this week" program

The Sacred Heart Chant Tool is made for anyone catholic musician that wants to add more chant into their liturgy. The primary use this tool is to create the Responsorial Psalm from one of the specified chant tones, however it can theoretically connvert any text into a simple tone.

The tool is named for the parish I come from , Sacred Heart, in Klamath Falls, Or.

## Setup and Usage
In order to use this tool, you will need to have node.js and npm installed. Check package.json for details on which versions you will need.

Once you have that, clone the repo into an empty folder, then replace the text in psalm.txt with whatever text you which to have converted. Use the : to seperate verses into two parts, this will be used by the program to identify breaks and tone placement.

Next, in your terminal of choice, run "node applyPsalmTone.js  <arg> and watch the magic happen! It will output the file as a .gabc which is used by gregorio, search up Source and Summit Editor if you want a quick way to view  the output as square note!

The current arguments are 'I' and 'II' correlating to each tone.

This tool is in very early stages, and will be updated frequently.  PR's are welcome, the hope is to eventually have a webtool where you can easily input which psalm verses you would like, and it will automagically produce a PDF. If you want to help more, you can contact me through email at billybobcoxiii@icloud.com.