<script lang="ts">
	import { getContext } from 'svelte';
	import { minted } from '$stores';
	import { IPFS } from '$lib/ipfs';
	import { getSvg } from '$lib/getSvg';
	import { options as layers } from '$lib/layerOptions';

	let values = getContext('currentBanny');

	let currentPanel = 'banny';

	async function upload() {
		const ipfs = await IPFS.create({
			repo: 'ipfs-' + Math.random()
		});
		const { cid } = await ipfs.add(
			JSON.stringify({
				name: `Juicebox #${1}`,
				// TODO Derive attributes from character
				attributes: [
					{ trait_type: 'Color', value: 'White' },
					{ trait_type: 'Distortion Scale', value: 11 },
					{ trait_type: 'Rings', value: 6 },
					{ trait_type: 'Frequency Multiple', value: 2 }
				],
				description: 'Distortion is a fully hand-typed 100% on-chain art collection.',
				image: `data:image/svg+xml;base64,${btoa(await getSvg($values))}`
			})
		);
		minted.set(`https://cloudflare-ipfs.com/ipfs/${cid.toString()}`);
	}

	function getPathFromMenuButton(name: string) {
		if (name === '') {
			return `/composer/banny-menu-button.svg`;
		}
		return `/composer/banny-${name}-menu-button.svg`;
	}

	const MenuButtons = [
		{
			path: 'banny'
		},
		{
			path: 'head-gear'
		},
		{
			path: 'face'
		},
		{
			label: 'necklace',
			path: 'chocker'
		},
		{
			path: 'outfit'
		},
		{
			label: 'objects',
			path: 'accessory'
		},
		{
			path: 'feet'
		}
	];
</script>

<div class="controls">
	<aside>
		{#each MenuButtons as menu}
			<div
				class="img-button"
				class:active={currentPanel === menu.path}
				on:click={() => {
					currentPanel = menu.path;
				}}
			>
				<img src={getPathFromMenuButton(menu.path)} alt={`Menu button for ${menu.path}`} />
				<span>{menu.label || menu.path.replace('-', ' ')}</span>
			</div>
		{/each}
	</aside>

	<!-- {#each Object.entries(layers) as [key, options]}
		<div class="control">
			<label for={key}>{key.replace('_', ' ')}</label>
			<select name={key} bind:value={$values[key]}>
				<option value="">None</option>
				{#each options as option}
					<option value={option}>{option.replace('_', ' ')}</option>
				{/each}
			</select>
		</div>
	{/each}

	<p />
	<button on:click={upload}>Upload to IPFS</button> -->
</div>

<style>
	aside {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		/* margin-bottom: 1rem; */
	}
	img {
		max-height: 85%;
		max-width: 100%;
	}

	span {
		text-transform: uppercase;
		font-size: 10px;
		color: var(--pure-white);
	}

	.img-button {
		width: 80px;
		height: 80px;
		background-color: var(--primary-action-color);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.2s ease-in-out;
	}

	.active {
		background-color: var(--background-l2);
	}
	.active span {
		color: black;
	}
	.controls {
		margin-top: 2rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
</style>
