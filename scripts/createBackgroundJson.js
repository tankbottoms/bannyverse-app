import fs from 'fs';

const backgroundDirectory = '../static/composer/character-backgrounds/';
const destinationDirectory = '../src/data';
// For each file in directory, add name to array
const backgroundFiles = fs.readdirSync(backgroundDirectory);
let backgroundNames = [];
for (const background of backgroundFiles) {
	if (background.endsWith('.gif') || background.endsWith('.png')) {
		backgroundNames = [...backgroundNames, background];
	}
}

// Write to file
fs.writeFileSync(`${destinationDirectory}/backgroundGifs.json`, JSON.stringify(backgroundNames));
