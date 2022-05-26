/**
 *   Helper script to copy the doc files to the static directory
 * */
import fs from 'fs';

function getPathFromMenuButtonName(name) {
	return `./docs/panel-2-composer/banny-${name}-menu-button.svg`;
}

// TODO put this in like a yaml/json config file, potentially just derive it from
// doc directory without the step of defining the config.
const MenuButtons = ['accessory', 'chocker', 'face', 'feet', 'outfit', 'head-gear'];

for (const name of MenuButtons) {
	const path = getPathFromMenuButtonName(name);
	const staticPath = `./static/composer/banny-${name}-menu-button.svg`;
    fs.copyFileSync(path, staticPath)
}
