/**
 * Script to traverse a directory of veBannies and create a json file of the layers
 * with the bannies bucket as key
 */

import fs from 'fs';

const veBannyDirectory = './docs/veBanny-layered-assets/veBanny/';

// Load csv file characters-metadata within veBannyDirectory and return as an object
// of key-value pairs name: bucket
function loadCharactersMetadata() {
	const csvFile = fs.readFileSync(`${veBannyDirectory}characters-metadata.csv`, 'utf8');
	const lines = csvFile.split('\n');
	const charactersMetadata = {};
	for (const line of lines.slice(1)) {
		let [bucket, name, ...rest] = line.split(',');
		// Remove the " from name
		name = name.replace(/"/g, '');
		// Replace space with _
		name = name.replace(/\s/g, '_');
		// Remove dots from name
		name = name.replace(/\./g, '');
		if (name === 'Emmett_“Doc”_Brown') {
			name = 'Emmett_Doc_Brown';
		}
		charactersMetadata[name] = Number(bucket);
	}
	return charactersMetadata;
}

function formatFileNameToLayerName(fileName) {
	return fileName[0].replace('.png', '');
}

function getCharacterLayersFromDirectory(directory) {
	const traitDirectories = fs.readdirSync(directory);
	const layers = {};
	for (const trait of traitDirectories) {
		// Check that it's a directory
		if (fs.lstatSync(`${directory}/${trait}`).isDirectory()) {
			if (trait != 'Background') {
				layers[trait] = formatFileNameToLayerName(fs.readdirSync(`${directory}${trait}`, 'utf8'));
			}
		}
	}
	return layers;
}

const charactersMetadata = loadCharactersMetadata();
const charactersLayers = {};

// Iterate over each directory in the veBanny directory
fs.readdirSync(veBannyDirectory).forEach(dir => {
	// Check that it's a directory
	if (fs.lstatSync(veBannyDirectory + dir).isDirectory()) {
		// Remove the Character_ from the directory name
		let name = dir.replace(/Character_/g, '');
		// Remove the trailing _*_Days from the directory
		name = name.replace(/_(10|50|100|500|1000)_Days/g, '');

		// Don't bother if we've already got the layers for this character
		if (charactersLayers[name]) {
			return;
		}

		const layerDirectory = `${veBannyDirectory}${dir}/Traits/`;
		const characterLayers = getCharacterLayersFromDirectory(layerDirectory);

		const objectKey = charactersMetadata[name];
		if (!objectKey) {
			console.log("Oops, this Banny isn't mapping: ", name);
			return;
		}
		charactersLayers[objectKey] = characterLayers;
	}
});

// Finally, save the charactersLayers to a json file
fs.writeFileSync('./static/composer/charactersLayers.json', JSON.stringify(charactersLayers));
