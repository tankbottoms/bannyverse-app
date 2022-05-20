<script lang="ts">
	import { getContext } from 'svelte';
	import { minted } from '$stores';
	import { IPFS } from '$lib/ipfs';
	import { getSvg } from '$lib/getSvg';
	import { options as layers } from '$lib/layerOptions';
	import AssetOption from '$lib/AssetOption.svelte';

	let values = getContext('currentBanny');

	const MenuButtons = [
		{
			path: 'banny',
			assetPath: 'Body'
		},
		{
			path: 'head-gear',
			assetPath: 'Headgear'
		},
		{
			path: 'face',
			assetPath: 'Face'
		},
		{
			label: 'necklace',
			path: 'chocker',
			assetPath: 'Choker'
		},
		{
			path: 'outfit',
			assetPath: 'Outfit'
		},
		{
			label: 'objects',
			path: 'accessory',
			// assetPath: ['Left_Hand', 'Right_Hand', 'Both_Hands']
			assetPath: ['Lower_Accessory']
		},
		{
			path: 'feet',
			assetPath: 'Lower_Accessory'
		}
	];

	let currentPanel = MenuButtons[0];

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

	function getLabelFromMenuButton(button) {
		return button.label || button.path.replace('-', ' ');
	}
</script>

<div class="controls">
	<div class="panel">
		<header>
			Choose your {getLabelFromMenuButton(currentPanel)}
		</header>
		{#if currentPanel.path === 'banny'}
			<p>Choose the VeBanny you would like to accessorize!</p>
		{/if}
		<div class="assetGrid">
			{#each layers[currentPanel.assetPath] as option}
				<AssetOption
					src={`/veBanny/${currentPanel.assetPath}/${option}.png`}
					alt={`Option ${option}`}
					on:click={() => {
						values.update((state) => ({
							...state,
							[currentPanel.assetPath]: option
						}));
					}}
				/>
			{/each}
		</div>
	</div>
	<aside>
		{#each MenuButtons as menu}
			<div
				class="img-button"
				class:active={currentPanel.path === menu.path}
				on:click={() => {
					currentPanel = menu;
				}}
			>
				<img src={getPathFromMenuButton(menu.path)} alt={`Menu button for ${menu.path}`} />
				<span>{getLabelFromMenuButton(menu)}</span>
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
		justify-content: space-between;
		background-color: var(--primary-action-color);
	}

	header {
		font-family: 'DM Mono', monospace;
		text-align: center;
		padding: 0.5rem;
		background-color: var(--background-l2);
		box-shadow: 0px 3.686514139175415px 3.686514139175415px 0px rgba(0, 0, 0, 0.05);
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
		/* height: 80px; */
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

	.assetGrid {
		margin-top: 1rem;
		overflow: scroll;
		max-height: 600px;
	}

	.panel {
		background-color: var(--background-l0);
		width: 450px;
		text-align: center;
	}
	.controls {
		margin-top: 2rem;
		display: flex;
		height: 650px;
	}
</style>
