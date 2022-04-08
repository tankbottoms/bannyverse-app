import type { ethers } from 'ethers';
import Store from './Store';

export const nonce = new Store(-1);

export async function getNonce(provider: ethers.providers.Web3Provider, account: string): Promise<number> {
	const baseNonce = await provider.getTransactionCount(account);
	const _nonce = Math.max(nonce.get() + 1, baseNonce);
	nonce.set(_nonce);
	return _nonce;
};