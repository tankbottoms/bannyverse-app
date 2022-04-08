/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export default class FileStore {
	CACHE_NAME = 'default_filestore';
	constructor(cache_name = 'default_filestore') {
		this.CACHE_NAME = cache_name;
	}
	static get default() {
		return new FileStore();
	}
	get cache() {
		return caches.open(this.CACHE_NAME);
	}
	getKey(file: File = undefined) {
		if (file) {
			return `${file.lastModified}-${file.size}-${file.name}`;
		}
		const timestamp = new Date().getTime();
		const random = Math.floor(Number.MAX_SAFE_INTEGER * Math.random());
		return (timestamp * random).toString(36);
	}
	async set(file: File, key = this.getKey(file)) {
		const cache = await this.cache;
		await cache.put(
			new Request(`/${key}`),
			new Response(file, {
				headers: new Headers({
					filename: file.name,
					lastmodified: `${file.lastModified}`,
					size: `${file.size}`,
					type: `${file.type}`,
				}),
			})
		);
		return key;
	}
	async get(key: string) {
		const cache = await this.cache;
		const response = await cache.match(new Request(`/${key}`));
		return new File([await response.blob()], response.headers.get('filename') || 'untitled', {
			lastModified: Number(response.headers.get('lastmodified') || 0) || undefined,
			type: response.headers.get('type') || undefined,
		});
	}
}
