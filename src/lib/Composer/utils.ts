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
