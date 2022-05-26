/**
 * Script to traverse a directory of veBannies and create a json file of the layers
 * with the bannies bucket as key
 */

import fs from 'fs';

const veBannyDirectory = './docs/veBanny-layered-assets/veBanny/';
const charactersLayers = {};
const nameToBucket = {};

// Load csv file characters-metadata within veBannyDirectory and return as an object
// of key-value pairs name: bucket
function loadCharactersMetadata() {
	const csvFile = fs.readFileSync('./docs/characters-metadata-history.csv', 'utf8');
	const lines = csvFile.split('\n');
	const charactersMetadata = {};
	for (const line of lines.slice(1)) {
		let [
			bucket,
			name,
			jbx_range,
			range_width,
			arcana,
			comms,
			grind,
			perception,
			strength,
			shadowiness,
			history,
			motto
		] = line.split(',');
		// Remove the " from name
		name = name.replace(/"/g, '');
		// Replace space with _
		name = name.replace(/\s/g, '_');
		// Remove dots from name
		name = name.replace(/\./g, '');
		if (name === 'Emmett_“Doc”_Brown') {
			name = 'Emmett_Doc_Brown';
		}
		const metadata = {
			name,
			jbx_range,
			range_width,
			arcana,
			comms,
			grind,
			perception,
			strength,
			shadowiness,
			history,
			motto
		};
		charactersMetadata[name] = Number(bucket);
		charactersLayers[bucket] = { metadata };
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

		const bucket = charactersMetadata[name];
		if (!bucket) {
			console.log("Oops, this Banny isn't mapping: ", name);
			return;
		}
		charactersLayers[bucket]['layers'] = characterLayers;
		nameToBucket[name] = bucket;
	}
});

// Finally, save the charactersLayers to a json file
fs.writeFileSync('./static/composer/characters.json', JSON.stringify(charactersLayers));
fs.writeFileSync('./static/composer/charactersNameToBucket.json', JSON.stringify(nameToBucket));
