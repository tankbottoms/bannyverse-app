import environment from '../../environment';

export function getFirestorePath(path: string): string {
	let startsWithSlash = false;
	if (path.startsWith('/')) {
		path = path.slice(1);
		startsWithSlash = true;
	}
	const parts = path.split('/');
	const prod = `${environment.BACKEND_API}`.startsWith('prod');
	const prepend = prod ? `prod-` : 'dev-';
	if (!parts[0].startsWith(prepend)) {
		parts[0] = `${prepend}${parts[0]}`;
	}
	let result = parts.join('/');
	if (startsWithSlash) {
		result = `/${result}`;
	}
	return result;
}
