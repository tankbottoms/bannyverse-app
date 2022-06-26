import fs from 'fs';
import { parse } from 'csv-parse';

/**
 * This script creates a JSON file containing the metadata for all the assets in the Bannyverse provided a metadata-csv
 * as well as create the layerOptions.json file which contains the list of layers in the *correct order*
 * unlike the layerOptions.json created by extractUniqueAssetsFromBannyDirs.js
 */

const createLayerOptions = true;

function getDirectories(srcpath) {
	return fs.readdirSync(srcpath).filter(file => fs.lstatSync(`${srcpath}/${file}`).isDirectory());
}

// Load csv file assets-metadata and return as an object
export async function loadAssetMetadata(path) {
	const assetMetadata = {};
	const layerOptions = {};
	// Wrap create read stream in a promise
	return new Promise((resolve, reject) => {
		return fs
			.createReadStream(path)
			.pipe(parse({ delimiter: ',', from_line: 2 }))
			.on('data', function(row) {
				let [
					asset,
					layer,
					character,
					new_name,
					character_index,
					arcana,
					comms,
					grind,
					perception,
					strength,
					shadowiness,
					modifier_arcana,
					modifier_comms,
					modifier_grind,
					modifier_perception,
					modifier_strength,
					modifier_shadowiness,
					boost_swaggin,
					boost_pacifist,
					boost_punk,
					boost_wtf,
					boost_au_naturel,
					boost_sore_thumb,
					boost_muse,
					boost_butcher,
					boost_420_friendly
				] = row;

				const data = {
					character_index,
					modifier_arcana,
					modifier_comms,
					modifier_grind,
					modifier_perception,
					modifier_strength,
					modifier_shadowiness,
					boost_swaggin,
					boost_pacifist,
					boost_punk,
					boost_wtf,
					boost_au_naturel,
					boost_sore_thumb,
					boost_muse,
					boost_butcher,
					boost_420_friendly
				};

				Object.keys(data).forEach(key => {
					// Parse string to number
					data[key] = Number(data[key]);

					// If number is 0, delete key
					if (data[key] === 0) {
						delete data[key];
					}
				});
				// Check if layer key on assetMetadata exists
				if (!assetMetadata[layer]) {
					assetMetadata[layer] = {};
				}
				assetMetadata[layer][asset] = data;

				if (createLayerOptions) {
					if (!layerOptions[layer]) {
						layerOptions[layer] = [];
					}
					layerOptions[layer].push(asset);
				}
			})
			.on('end', function() {
				return resolve({ assetMetadata, layerOptions });
			});
	});
}

// The file which has modifiers and boosts for each asset
const { assetMetadata, layerOptions } = await loadAssetMetadata('./docs/assets_metadata.csv');

if (createLayerOptions) {
	// We need to add the "Other" asset options to the layerOptions
	const otherDirectory =
		'./docs/veBanny-rebuild-assets/veBanny_Final_Non-Standard_Character_Accessory/OTHER_non-standard_accessories';

	const characterLayers = getDirectories(otherDirectory);
	characterLayers.forEach(layer => {
        console.log(layer)
		const assets = fs.readdirSync(`${otherDirectory}/${layer}`);
        console.log(assets)
		assets.forEach(asset => {
            const name = asset.split('.')[0];
			layerOptions[layer].push(name);
		});
	});
}

// Write assets object to data/assetsMetadata.json
fs.writeFileSync('./src/data/assetsMetadata.json', JSON.stringify(assetMetadata, null, 2));
// TODO when the correct assetsMetadata comes back, create the layer json from that to get sorder order
fs.writeFileSync('./src/data/layerOptions.json', JSON.stringify(layerOptions, null, 2));
