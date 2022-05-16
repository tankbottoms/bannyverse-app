import Store from '$utils/Store';

export default class PersistantStore<T> extends Store<T> {
	constructor(key: string, _default: T = undefined) {
		if (typeof _default === 'undefined')
			_default = JSON.parse(localStorage.getItem(key)) || _default;
		super(_default);
		this.subscribe((value) => {
			localStorage.setItem(key, JSON.stringify(value));
		});
	}
}
