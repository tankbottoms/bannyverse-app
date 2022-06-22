/**
 * Script to traverse a directory of veBannies and create a json file of the layers
 * with the bannies bucket as key
 */

import fs from 'fs';
import { nameFromDirectory, loadCharactersMetadata } from './utils.js';

const useNonStandard = true;

const veBannyDirectory = './docs/veBanny-rebuild-assets/veBanny_Final_Standard/';
const nonStandardBannyDirectory =
	'./docs/veBanny-rebuild-assets/veBanny_Final_Non-Standard_Character_Accessory/';
const nameToBucket = {};

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

const { charactersMetadata, charactersLayers } = await loadCharactersMetadata(veBannyDirectory);

// Iterate over each directory in the veBanny directory
fs.readdirSync(veBannyDirectory).forEach(dir => {
	// Check that it's a directory
	if (fs.lstatSync(veBannyDirectory + dir).isDirectory()) {
		const name = nameFromDirectory(dir);
		// Don't bother if we've already got the layers for this character
		// this'll happen in the case of several directories for the same character
		// but with different lock periods in the directory name (10, 50, 100, 500, 1000)
		if (nameToBucket[name]) {
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

if (useNonStandard) {
	// Continue from the 60 main characters
	let currentBucketIndex = 61;
	fs.readdirSync(nonStandardBannyDirectory).forEach(dir => {
		// Check that it's a directory
		if (
			fs.lstatSync(nonStandardBannyDirectory + dir).isDirectory() &&
			dir.startsWith('Character_')
		) {
			const name = nameFromDirectory(dir);
			const layerDirectory = `${nonStandardBannyDirectory}${dir}/Traits/`;
			const characterLayers = getCharacterLayersFromDirectory(layerDirectory);

			charactersLayers[currentBucketIndex] = {};
			charactersLayers[currentBucketIndex]['layers'] = characterLayers;
			charactersLayers[currentBucketIndex]['metadata'] = { name };
			nameToBucket[name] = currentBucketIndex;
			currentBucketIndex++;
		}
	});
}

// Finally, save the charactersLayers to a json file
fs.writeFileSync('./src/data/characters.json', JSON.stringify(charactersLayers));
fs.writeFileSync('./src/data/charactersNameToBucket.json', JSON.stringify(nameToBucket));
