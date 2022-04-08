import { browser } from '$app/env';

export function htmlToText(html: string): string {
	if (typeof window === 'undefined') return '';
	const div = document.createElement('div');
	div.innerHTML = html;
	return div.innerText;
}

export function dateToString(date: Date | number, format = 'MM/DD/YYYY'): string {
	const _date = new Date(date);
	const month = `${_date.getMonth() + 1}`.padStart(2, '0');
	const day = `${_date.getDate()}`.padStart(2, '0');
	const year = `${_date.getFullYear()}`.padStart(4, '0');
	return format.replace('MM', month).replace('DD', day).replace('YYYY', year);
}

export function cutEthAddress(value: string): string {
	return `${value.slice(0, 6)}...${value.slice(-4)}`;
}

export function getBaseRem(): string {
	if (!browser) {
		return '';
	}

	return document.documentElement.style.getPropertyValue('--primary-font-size');
}

export function pixelToRem(px: number): string {
	if (!browser) {
		return '';
	}

	const baseRem = parseFloat(getBaseRem().replace(/,/g, '.')) || 16;

	return (1 / baseRem) * px + 'rem';
}
