/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { browser } from '$app/env';
import hexToRgba from 'hex-to-rgba';
import { DEFAULT_RGB_COLOR } from '../../constants';

export function hslToHex(h, s, l) {
	const lightness = l / 100;
	const a = (s * Math.min(lightness, 1 - lightness)) / 100;

	const convert = (n) => {
		const k = (n + h / 30) % 12;
		const color = lightness - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

		return Math.round(255 * color)
			.toString(16)
			.padStart(2, '0');
	};

	return `#${convert(0)}${convert(8)}${convert(4)}`;
}

export function hexToRgbVars(hex: string, prefix = '--') {
	const rgba = hexToRgba(hex);
	const name = ['r', 'g', 'b', 'a'];
	const [r, g, b, a] = rgba.match(/\d+/g).map((n, i) => `${prefix}${name[i]}:${n};`);
	return [r, g, b, a].join('');
}

export function setRGBProperties(colorVars: string) {
	if (!browser) {
		return;
	}

	const $html = document.documentElement as HTMLElement;
	const [rString, gString, bString] = colorVars.split(';');
	const colors = [rString, gString, bString].map((color) => color.split(':'));

	colors.forEach((color) => {
		$html.style.setProperty(color[0], color[1]);
	});
}

export function setDefaultRGBProperties() {
	if (!browser) {
		return;
	}

	const $html = document.documentElement as HTMLElement;

	DEFAULT_RGB_COLOR.forEach((color) => {
		$html.style.removeProperty(color[0]);
	});
}
