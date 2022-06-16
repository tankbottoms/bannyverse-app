import fs from 'fs';

const baseDirectory = './docs/veBanny-rebuild-assets/veBanny_Final_Standard';
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

function extractUniqueAssetsFromBannyDirs(srcpath) {
	const directories = getDirectories(srcpath);
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
		Right_Hand: new Set(),
	};
	directories.forEach(directory => {
		const characterDirectory = `${srcpath}/${directory}/Traits`;
		const characterLayers = getDirectories(characterDirectory);
		characterLayers.forEach(layer => {
			const layerDirectory = `${characterDirectory}/${layer}`;
			const layerFiles = fs.readdirSync(layerDirectory);
			layerFiles.forEach(file => {
				const filePath = `${layerDirectory}/${file}`;
				const fileName = file.replace('.png', '');
				const destinationPath = `${assets}/${layer}/${file}`;
				layerJson[layer].add(fileName);
				fs.copyFileSync(filePath, destinationPath);
			});
		});
	});
    // Cast the sets to arrays
    Object.keys(layerJson).forEach(layer => {
        layerJson[layer] = Array.from(layerJson[layer]);
    })
    fs.writeFileSync(layerJsonPath, JSON.stringify(layerJson, null, 2));
}

extractUniqueAssetsFromBannyDirs(baseDirectory);
