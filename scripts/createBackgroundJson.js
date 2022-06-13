import fs from 'fs';

const backgroundDirectory = '../static/composer/character-backgrounds/';
const destinationDirectory = '../src/data';

// Capitalize first letter
function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function getNameFromFileName(fileName) {
	let name = fileName.replace(/"/g, '');
	name = name.replace(/\.gif/g, '');
	// Replace space and - with _
	name = name.replace(/[\s,-]/g, '_');
	let nameList = name.split('_');
	nameList = nameList.map(capitalizeFirstLetter);
	name = nameList.join('_');
	// Remove dots from name
	name = name.replace(/\./g, '');
	if (name === 'Emmett__“Doc”_Brown') {
		name = 'Emmett_Doc_Brown';
	}
	return name;
}

// For each file in directory, add name to array
const backgroundFiles = fs.readdirSync(backgroundDirectory);
let backgroundNames = {};
for (const background of backgroundFiles) {
	if (background.endsWith('.gif') || background.endsWith('.png')) {
		const name = getNameFromFileName(background);
		backgroundNames = {
			...backgroundNames,
			[name]: background
		};
	}
}

// Write to file
fs.writeFileSync(`${destinationDirectory}/backgroundGifs.json`, JSON.stringify(backgroundNames));
