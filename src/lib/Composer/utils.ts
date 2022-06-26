import assetsMetadata from '$data/assetsMetadata.json';

//** ASSETS */
export const MenuButtons = [
	{
		path: 'banny',
		assetPath: ['Body'],
		scale: 1
	},
	{
		path: 'head-gear',
		assetPath: ['Headgear'],
		scale: 1.5,
		translateY: 10
	},
	{
		path: 'face',
		assetPath: ['Face'],
		scale: 2.5,
		translateY: 10
	},
	{
		label: 'necklace',
		path: 'chocker',
		assetPath: ['Choker'],
		scale: 1.5
	},
	{
		path: 'outfit',
		assetPath: ['Outfit'],
		scale: 1.2,
		translateY: -5
	},
	{
		label: 'objects',
		path: 'accessory',
		assetPath: ['Left_Hand', 'Right_Hand', 'Both_Hands'],
		scale: 1.2,
		translateX: -10
	},
	{
		path: 'feet',
		assetPath: ['Lower_Accessory'],
		scale: 2,
		translateY: -30
	}
];

//** PRICING */

// The sigmoid function
function sigmoid(x: number) {
	let sig = 1 / (1 + Math.exp(-x));
	// Move sig to start at ca 0.05
	sig -= 0.45;
	// Round to 4 decimals
	sig = Math.round(sig * 10000) / 10000;
	return sig;
}

export function getPrice(characterIndex: number, layer: string, value: string) {
	console.log(characterIndex, layer, value);

	const assetMetadata = assetsMetadata[layer][value];
	if (!assetMetadata) {
		return;
	}
	const assetCharacterIndex = assetMetadata['character_index'];

	console.log(assetMetadata);
	console.log(assetCharacterIndex);
	// If the asset is "higher" power than the current chosen Banny,
	// the price is calculated by a sigmoid function of the difference between the two.
	if (characterIndex < assetCharacterIndex) {
		const difference = assetCharacterIndex - characterIndex;
		// Normalize difference to be between 0 and 1
		const normalizedDifference = difference / 60;
		// Calculate price from sigmoid function of difference between character index and asset character index
		return sigmoid(normalizedDifference);
	} else {
		// Otherwise, the price is 0 and the cost is merely the gas
		return '-';
	}
}

//** STARS */

function randomStar(innerWidth: number, innerHeight: number) {
	const star = {
		size: Math.random() * 0.5 + 0.1,
		top: undefined,
		left: undefined,
		right: undefined,
		bottom: undefined
	};

	if (Math.random() > 0.5) {
		star.right = Math.random() * innerWidth;
		star.top = Math.random() * innerHeight;
	} else {
		star.left = Math.random() * innerWidth;
		star.bottom = Math.random() * innerHeight;
	}

	return star;
}

const definedStars = [
	{
		size: 0.5,
		left: 100
	},
	{
		size: 1.2,
		right: 100
	},
	{
		size: 1,
		top: 20
	},
	{
		size: 0.3,
		bottom: 80,
		left: 100
	},
	{
		size: 0.8,
		left: 100,
		bottom: 180
	},
	{
		size: 0.9,
		top: 200,
		right: 150
	},
	{
		size: 0.7,
		left: 200,
		top: 140
	},
	{
		size: 0.3,
		left: 300,
		top: 250
	},
	{
		size: 0.5,
		bottom: 100
	},
	{
		size: 0.3,
		bottom: 150,
		left: 300
	},
	{
		size: 0.3,
		bottom: 80,
		right: 300
	},
	{
		size: 0.3,
		bottom: 15,
		left: 400
	}
];

export function getStars(innerWidth: number, innerHeight: number, count: number) {
	const randomStars = Array.from({ length: count }, () => randomStar(innerWidth, innerHeight));
	return [...definedStars, ...randomStars];
}
