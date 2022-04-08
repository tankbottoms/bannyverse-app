import { getFileURI } from '$lib/stores/firebase';
import hexToRgba from 'hex-to-rgba';
import type { MovementData } from 'src/global';
import environment from '../../environment';
import { hexToRgbVars } from './colors';

export async function getMovement(id: string): Promise<MovementData> {
	const response = await fetch(environment.VITE_API_ENDPOINT + `movements/${id}`);
	const jsonResponse = (await response.json()) as MovementData;
	if (jsonResponse?.page_data) {
		const page_data = jsonResponse.page_data || {};
		page_data.icon = getFileURI(page_data.icon);
		if (page_data?.color?.startsWith('#')) {
			page_data.colorVars = hexToRgbVars(page_data?.color);
			page_data.hexColor = hexToRgba(page_data?.color);
			page_data.color = hexToRgba(page_data?.color);
		}
		return {
			...{ id },
			...jsonResponse,
			page_data,
		};
	} else {
		throw new Error('invalid response');
	}
}
