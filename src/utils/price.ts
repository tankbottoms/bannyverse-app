import { daiPrice, ethPrice } from '$lib/stores/web3';
import { DAI_PRICE_API_ENDPOINT, ETH_PRICE_API_ENDPOINT } from '../../constants';
import { numberWithCommas } from './numbers';

export async function updateEthPrice(): Promise<void> {
	try {
		const response = await fetch(ETH_PRICE_API_ENDPOINT);
		const jsonResponse = await response.json();
		if (jsonResponse[0]) {
			// console.log(`ETH price API endpoint response ${JSON.stringify(jsonResponse[0])}`);
			ethPrice.set(jsonResponse[0].market_cap / jsonResponse[0].circulating_supply);
		}
	} catch (e) {
		console.error(e.message);
	}
}

export async function updateDaiPrice(): Promise<void> {
	try {
		const response = await fetch(DAI_PRICE_API_ENDPOINT);
		const jsonResponse = await response.json();
		if (jsonResponse[0]) {
			// console.log(`DAI price API endpoint response ${JSON.stringify(jsonResponse[0])}`);
			daiPrice.set(jsonResponse[0].market_cap / jsonResponse[0].circulating_supply);
		}
	} catch (e) {
		console.error(e.message);
	}
}

export function getTotalString(fee: string, value: string, coin: string): string {
	const $ethPrice = ethPrice.get();
	const $daiPrice = daiPrice.get();
	const total = Number(value) + Number(fee);
	if (coin === 'ETH') {
		return `$${numberWithCommas(Number((total * $ethPrice).toFixed(2)), 2)}`;
	} else if (coin === 'DAI') {
		if ($daiPrice && $ethPrice && fee) {
			return `$${numberWithCommas(Number((Number(value) * $daiPrice + Number(fee) * $ethPrice).toFixed(2)), 2)}`;
		}
	}
	return '';
}
