import fs from 'fs';

const bannyDirectory = '../static/banny-grid/';
const destinationDirectory = '../src/data';
// For each file in directory, add name to array
const bannyFiles = fs.readdirSync(bannyDirectory);
let bannyNames = [];
for (const banny of bannyFiles) {
	if (banny.endsWith('.gif') || banny.endsWith('.png')) {
		bannyNames = [...bannyNames, banny];
	}
}

// Write to file
fs.writeFileSync(`${destinationDirectory}/bannyGifs.json`, JSON.stringify(bannyNames));
