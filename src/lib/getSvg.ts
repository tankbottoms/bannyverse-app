export async function getSvg(values: Record<string, string>) {
	console.log(values)
	let layers = [];
	for (const [key, value] of Object.entries(values)) {
		if (!value) continue;
		const src = `/veBanny/${key}/${value}.png`;
		const response = await fetch(src);

		var reader = new FileReader();
		reader.readAsDataURL(await response.blob());
		await new Promise((resolve) => {
			reader.onloadend = function () {
				var base64data = reader.result;
				layers.push(base64data);
				resolve(true);
			};
		});
	}
	return layers;
}

export async function getSvgForKey({ key, value }: { key: string; value: string }) {
	if (!key || !value) return;
	const src = `/veBanny/${key}/${value}.png`;
	if (!src) return;
	const response = await fetch(src);

	var reader = new FileReader();
	reader.readAsDataURL(await response.blob());
	return await new Promise((resolve) => {
		reader.onloadend = function () {
			const base64data = reader.result;
			resolve(base64data);
		};
	});
}
