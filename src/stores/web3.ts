/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type WalletConnectWeb3ProviderType from '@walletconnect/web3-provider';
import Store from '$lib/utils/Store';
import { browser } from '$app/env';
import { providers } from 'ethers';
import { coins } from '$lib/presale';
import { toasts } from 'svelte-toasts';
import environment from '../../environment';

export const walletName = new Store<'metamask' | 'walletconnect'>(
	(browser && (localStorage.getItem('wallet-name') as any)) || 'metamask'
);

export const ethPrice = new Store(0);
export const daiPrice = new Store(0);
export const provider = new Store<providers.Web3Provider>();
export const connectedAccount = new Store('');
export const chainId = new Store<number>(0);

walletName.subscribe(name => browser && localStorage.setItem('wallet-name', name));

export async function walletConnect(startup = false): Promise<void> {
	if (walletName.get() === 'walletconnect') {
		const WalletConnectWeb3Provider = (await import('@walletconnect/web3-provider/dist/umd/index.min')).default;
		const wc = new (WalletConnectWeb3Provider as typeof WalletConnectWeb3ProviderType)({
			infuraId: environment.VITE_INFURA_API_KEY,
		});
		try {
			if (startup) wc.connector.accounts.length && wc.enable();
			else await wc.enable();
			if (wc.connected) {
				await initialize(wc);
				await connectWallet(true);
				await getConnectedAccount();
			}
		} catch (e: any) {
			console.error(e.message);
		}
	} else {
		initialize();
	}
}

export async function disconnectWalletConnect() {
	if (walletName.get() === 'walletconnect') {
		const _provider = provider.get().provider as any;
		_provider.disconnect();
		_provider.qrcodeModal.close();
	}
	provider.set(null);
}

setTimeout(() => walletConnect(true));

export async function initialize(_provider = browser && window['ethereum']): Promise<void> {
	if (!_provider) return;
	provider.set(new providers.Web3Provider(browser && _provider));
	if (browser) {
		(window as any).provider = provider.get();
	}
	chainId.set(Number(_provider.chainId));
	if (walletName.get() === 'walletconnect' && !coins[0].networks.find(net => net.chainId === chainId.get())) {
		toasts.add({
			title: 'Wrong Network',
			description: 'please connect to eth mainnet',
			duration: 10000,
			type: 'error',
			placement: 'top-right',
			onClick: () => {
				_provider.disconnect();
				window.location.reload();
			},
			onRemove: () => {
				_provider.disconnect();
				window.location.reload();
			},
		});
		return;
	}
	provider.get().on('network', network => {
		chainId.set(Number(network.chainId));
	});
	if (walletName.get() === 'walletconnect') {
		_provider.connector.on('disconnect', (_, { event }) => {
			window.location.reload();
		});
	} else {
		const $provider = provider.get();
		try {
			const account = await $provider.getSigner().getAddress();
			if (account) {
				connectedAccount.set(account);
			}
		} catch (e) {
			console.log('not connected');
		}
	}
	_provider.on('chainChanged', chainId => {
		window.location.reload();
	});
	_provider.on('accountsChanged', accounts => {
		window.location.reload();
	});
}

export async function getConnectedAccount(): Promise<Address | null> {
	try {
		const address = (await provider.get().getSigner().getAddress()) as Address;
		connectedAccount.set(address);
		return address;
	} catch (e: any) {
		return null;
	}
}

export async function connectWallet(isWalletConnect = false): Promise<Address> {
	if (!isWalletConnect) await provider.get().send('eth_requestAccounts', []);
	const signer = provider.get().getSigner();
	(await signer.getAddress()) as Address;
	await getConnectedAccount();
	return (await signer.getAddress()) as Address;
}

browser && getConnectedAccount();
