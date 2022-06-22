import fs from 'fs';
import { parse } from 'csv-parse';

// Load csv file characters-metadata within veBannyDirectory and return as an object
// of key-value pairs name: bucket
export async function loadCharactersMetadata(veBannyDirectory) {
	const charactersMetadata = {};
    const charactersLayers = {};
	// Wrap create read stream in a promise
	return new Promise((resolve, reject) => {
		return fs
			.createReadStream(`${veBannyDirectory}/characters-metadata-histories.csv`)
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
				// Remove any trailing _
				name = name.replace(/_$/, '');
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
				charactersMetadata[name] = Number(bucket);
				charactersLayers[bucket] = { metadata };
			})
			.on('end', function() {
				return resolve({ charactersMetadata, charactersLayers });
			});
	});
}

export function nameFromDirectory(dir) {
	// Remove the Character_ from the directory name
	let name = dir.replace(/Character_/g, '');
	// Remove the trailing _*_Days from the directory
	name = name.replace(/_(10|50|100|500|1000)_Days/g, '');
	// Remove any trailing spaces of the name
	name = name.replace(/\s+$/g, '');
	// Remove any trailing underscores of the name
	name = name.replace(/_+$/g, '');
	return name;
}
