import fs from 'fs';
import charactersJson from '../src/data/characters.json' assert { type: 'json' };

/**
 * Given that a characters.json has already been created with craeteCharacterJson.js,
 * create a csv file with the assets mapped to the character data.
 */
let data = {};

Object.keys(charactersJson).forEach(characterIndex => {
    const character = charactersJson[characterIndex];
    const metadata = character.metadata;
    const layers = character.layers;

    // Iterate over each layer
    for(const [layer, asset] of Object.entries(layers)) {
        // Check if asset already exists on data, create if not
        // As we are iterating over incrementing Bannies, we'll use the character with the lowest index
        // as the asset metadata.
        if (!data[asset]) {
            data[asset] = {
                layer,
                character: metadata.name,
                characterIndex,
                arcana: metadata.arcana,
                comms: metadata.comms,
                grind: metadata.grind,
                perception: metadata.perception,
                strength: metadata.strength,
                shadowiness: metadata.shadowiness,
                // jbx_range: metadata.jbx_range,
            };
        }
    }
})

// Create header row
const columns = ['asset', ...Object.keys(data[Object.keys(data)[0]])].join(', ');

// Create the csv rows with the Data object key as id and the 
// value object as columns
const rows = Object.keys(data).map(id => {
    const row = data[id];
    const columns =  Object.values(row).join(', ');
    return `${id}, ${columns}`;
})

const csvData = [columns, ...rows].join('\n');

// For each row, write to a csv file "assets-metadata.csv"
fs.writeFileSync('./src/data/assets-metadata.csv', csvData);





