/**
 * Takes a directory of files, and any directory with a nested file, takes the file and puts in the root directory and deletes the nested directory
 */

import fs from 'fs';

const baseDirectory = './static/composer/character-backgrounds';

function getDirectories(srcpath) {
	return fs.readdirSync(srcpath).filter(file => fs.lstatSync(`${srcpath}/${file}`).isDirectory());
}

function removeNestedDirectories(srcpath) {
	const directories = getDirectories(srcpath);
	directories.forEach(directory => {
		// const trueName = directory.replace('~refs', '');
		// const file = fs.readFileSync(`${srcpath}/${directory}/remotes/origin/main`);
        // fs.writeFileSync(`${srcpath}/${trueName}`, file);
		fs.rmdirSync(`${srcpath}/${directory}`, { recursive: true });
	});
}

function removeBackgroundGifs(srcpath) {
	const files = fs.readdirSync(srcpath);
	files.forEach(file => {
		if (file.endsWith('.gif~Added additional character gifs')) {
			// Remove the file
			fs.unlinkSync(`${srcpath}/${file}`);
		}
	});
}

removeNestedDirectories(baseDirectory);
removeBackgroundGifs(baseDirectory);