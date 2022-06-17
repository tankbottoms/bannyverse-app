import fs from 'fs';

const baseDirectory = './docs/veBanny-rebuild-assets/veBanny_Final_Standard';
const nonStandardBannyDirectory =
	'./docs/veBanny-rebuild-assets/veBanny_Final_Non-Standard_Character_Accessory/';

const assets = './static/veBanny';
const layerJsonPath = './src/data/layerOptions.json';

/**
 * Given a structure of nested directories of Bannies:
 * - baseDirectory
 *      - character_x
 *          - Body
 *              - Yellow.png
 *          - Both_Hands
 *              - Nothing.png
 *          - Choker
 *              - Choker.png
 *          ....
 *      - character_y
 *          - Body
 *              - Yellow.png
 *          ....
 * Take each character directory, take the file for each category and put it the asset directory under the aggregated bucket
 * - assets
 *      - Body
 *          - Yellow.png
 *          - Blue.png
 *      ...
 *
 */

function getDirectories(srcpath) {
	return fs.readdirSync(srcpath).filter(file => fs.lstatSync(`${srcpath}/${file}`).isDirectory());
}

function copyAssetsToAggregatedDirectory(characterDirectory, layerJson) {
	const characterLayers = getDirectories(characterDirectory);
	characterLayers.forEach(layer => {
		const layerDirectory = `${characterDirectory}/${layer}`;
		const layerFiles = fs.readdirSync(layerDirectory);
		layerFiles.forEach(file => {
			const filePath = `${layerDirectory}/${file}`;
			const fileName = file.replace('.png', '');
			// Check if layer directory exists, create if not
			if (!fs.existsSync(`${assets}/${layer}`)) {
				fs.mkdirSync(`${assets}/${layer}`);
			}
			const destinationPath = `${assets}/${layer}/${file}`;
			layerJson[layer].add(fileName);
			fs.copyFileSync(filePath, destinationPath);
		});
	});
}

function extractUniqueAssetsFromBannyDirs(standard_srcpath, nonstandard_srcpath) {
	const standardDirectories = getDirectories(standard_srcpath);
	const nonstandardDirectories = getDirectories(nonstandard_srcpath);

	const layerJson = {
		Body: new Set(),
		Both_Hands: new Set(),
		Choker: new Set(),
		Face: new Set(),
		Headgear: new Set(),
		Left_Hand: new Set(),
		Lower_Accessory: new Set(),
		Oral_Fixation: new Set(),
		Outfit: new Set(),
		Right_Hand: new Set()
	};

	standardDirectories.forEach(directory => {
		const characterDirectory = `${standard_srcpath}/${directory}/Traits`;
		copyAssetsToAggregatedDirectory(characterDirectory, layerJson);
	});

	nonstandardDirectories.forEach(directory => {
		let characterDirectory = `${nonstandard_srcpath}/${directory}/Traits`;
		if(directory.startsWith("OTHER")) {
			characterDirectory = `${nonstandard_srcpath}/${directory}`;
		}
		copyAssetsToAggregatedDirectory(characterDirectory, layerJson);
	});

	// Cast the sets to arrays
	Object.keys(layerJson).forEach(layer => {
		layerJson[layer] = Array.from(layerJson[layer]);
	});
	fs.writeFileSync(layerJsonPath, JSON.stringify(layerJson, null, 2));
}

extractUniqueAssetsFromBannyDirs(baseDirectory, nonStandardBannyDirectory);
