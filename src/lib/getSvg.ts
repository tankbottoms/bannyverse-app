export async function getSvg(values: Record<string, string>) {
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
