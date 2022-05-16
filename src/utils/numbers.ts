/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const msInASecond = 1000;
export const msInAMinute = msInASecond * 60;
export const msInAnHour = msInAMinute * 60;
export const msInADay = msInAnHour * 24;
export const msInAWeek = msInADay * 7;
export const msInAMonth = msInADay * 30.4;
export const LAUNCH_EPOCH_DATE = 1647958942000;

export function numberWithCommas(x: number, float: number = undefined): string {
	let p = '';
	if (typeof float === 'number') {
		[x, p] = x
			.toFixed(float)
			.split('.')
			.map((n, i) => (i === 0 ? Number(n) : n)) as [number, string];
		if (float) {
			p = '.' + p;
		}
	}
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (p || '');
}

export function epochTimeConverter(tm: number): string {
	let currentDate = new Date();
	let releaseDate = new Date(Math.max(LAUNCH_EPOCH_DATE, tm + msInAMonth));

	let epochCountdown = releaseDate.getTime() - currentDate.getTime();

	if (epochCountdown / msInADay > 1) {
		return Math.round(epochCountdown / msInADay).toString() + ' days';
	} else if (epochCountdown / msInAnHour < 24 && epochCountdown / msInAnHour > 1) {
		return Math.round(epochCountdown / msInAnHour).toString() + ' hours';
	} else if (epochCountdown / msInAMinute < 60 && epochCountdown / msInAMinute > 1) {
		return Math.round(epochCountdown / msInAMinute).toString() + ' minutes';
	} else if (epochCountdown / msInASecond < 60 && epochCountdown / msInASecond > 1) {
		return Math.round(epochCountdown / msInASecond).toString() + ' seconds';
	} else {
		return 'err';
	}
}

export function pastTimeReader(time: number): string {
	const now = new Date().getTime();
	const ms = now - time;
	const units = ['month', 'week', 'day', 'hour', 'minute', 'second', 'milisecond'];
	const values = [
		ms / msInAMonth,
		ms / msInAWeek,
		ms / msInADay,
		ms / msInAnHour,
		ms / msInAMinute,
		ms / msInASecond,
		ms
	];
	const index = values.findIndex((value) => value > 1);
	let unit = units[index] || 'second';
	if (Math.floor(values[index]) !== 1) unit += 's';
	return `${Math.floor(values[index])} ${unit} ago`;
}

export function numberWithUnit(n: number | string, float = 6) {
	if (typeof n === 'string') n = Number(n.replace(/[,]/g, ''));
	const units = ['k', 'M', 'B', 'T', 'Q', 'S'];
	let i = -1;
	let _n = n;
	while (Math.floor(_n / 1000) >= 1) {
		i++;
		_n = _n / 1000;
	}
	console.log(_n, n);
	return [Number(_n.toFixed(float)), units[i]];
}

export function numberFromString(str: string | number) {
	return Number(`${str}`.replace(/[,]/g, ''));
}

export const milisecondsInADay = 86400000;

export function progressBarValueCount(deps: boolean[]): number {
	return (deps.reduce((acc, cur) => Number(acc) + Number(cur), 0) / deps.length) * 100;
}
