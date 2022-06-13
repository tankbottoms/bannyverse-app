/**
 * Script to traverse a directory of veBannies and create a json file of the layers
 * with the bannies bucket as key
 */

import fs from 'fs';
import { parse } from 'csv-parse';

const veBannyDirectory = './docs/veBanny-layered-assets/veBanny/';
const charactersLayers = {};
const nameToBucket = {};

// Load csv file characters-metadata within veBannyDirectory and return as an object
// of key-value pairs name: bucket
async function loadCharactersMetadata() {
	const charactersMetadata = {};
	// Wrap create read stream in a promise
	return new Promise((resolve, reject) => {
		return fs
			.createReadStream('./docs/characters-metadata-history.csv')
			.pipe(parse({ delimiter: ',', from_line: 2 }))
			.on('data', function(row) {
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
				] = row;

				name = name.replace(/"/g, '');
				// Replace space with _
				name = name.replace(/\s/g, '_');
				// Remove dots from name
				name = name.replace(/\./g, '');
				if (name === 'Emmett__“Doc”_Brown') {
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
				// console.log(metadata);
				charactersMetadata[name] = Number(bucket);
				charactersLayers[bucket] = { metadata };
			})
			.on('end', function() {
				return resolve(charactersMetadata);
			});
	});
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

const charactersMetadata = await loadCharactersMetadata();

// Iterate over each directory in the veBanny directory
fs.readdirSync(veBannyDirectory).forEach(dir => {
	// Check that it's a directory
	if (fs.lstatSync(veBannyDirectory + dir).isDirectory()) {
		// Remove the Character_ from the directory name
		let name = dir.replace(/Character_/g, '');
		// Remove the trailing _*_Days from the directory
		name = name.replace(/_(10|50|100|500|1000)_Days/g, '');
		// Remove any trailing spaces of the name
		name = name.replace(/\s+$/g, '');
		// Don't bother if we've already got the layers for this character
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

// Finally, save the charactersLayers to a json file
fs.writeFileSync('./src/data/characters.json', JSON.stringify(charactersLayers));
fs.writeFileSync('./src/data/charactersNameToBucket.json', JSON.stringify(nameToBucket));
