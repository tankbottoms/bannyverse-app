<script lang="ts">
	import { getContext } from 'svelte';
	import { options as layers } from '$lib/layerOptions';
	import AssetOption from '$lib/AssetOption.svelte';

	import characters from '$data/characters.json';

	let currentBanny = getContext('currentBanny') as any;
	let values = currentBanny.layers;
	let name = currentBanny.name;
	let characterIndex = currentBanny.characterIndex;

	const MenuButtons = [
		{
			path: 'banny',
			assetPath: ['Body'],
			scale: 1
		},
		{
			path: 'head-gear',
			assetPath: ['Headgear'],
			scale: 1.5,
			translateY: 10
		},
		{
			path: 'face',
			assetPath: ['Face'],
			scale: 2.5,
			translateY: 10
		},
		{
			label: 'necklace',
			path: 'chocker',
			assetPath: ['Choker'],
			scale: 1.5
		},
		{
			path: 'outfit',
			assetPath: ['Outfit'],
			scale: 1.2,
			translateY: -5
		},
		{
			label: 'objects',
			path: 'accessory',
			assetPath: ['Left_Hand', 'Right_Hand', 'Both_Hands'],
			scale: 1.2,
			translateX: -10
		},
		{
			path: 'feet',
			assetPath: ['Lower_Accessory'],
			scale: 2,
			translateY: -30
		}
	];

	let currentPanel = MenuButtons[0];

	// Characters number from 1 to 60
	const characterIndeces = Array.from(Array(60).keys()).slice(1);
	function getPathFromCharacter(number: number) {
		if (number < 10) {
			return `/characters/0${number}.png`;
		}
		return `/characters/${number}.png`;
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

	// Set values from characterIndex
	function setValuesFromCharacterIndex(index: number) {
		values.set(characters[index]['layers']);
		name.set(characters[index]['metadata']['name']);
		characterIndex.set(index);
	}
</script>

<div class="controls">
	<div class="panel">
		<header>
			Choose your {getLabelFromMenuButton(currentPanel)}
		</header>
		<div class="assetGrid">
			{#if currentPanel.path === 'banny'}
				<p>Choose the VeBanny you would like to accessorize!</p>
				<!-- From 0 to 60 load 0.png... 2.png etc  from /characters/ -->
				{#each characterIndeces as character}
					<img
						class="character"
						on:click={() => setValuesFromCharacterIndex(character)}
						src={getPathFromCharacter(character)}
						alt="Character"
					/>
				{/each}
			{:else}
				<!-- TODO fix this type issue -->
				{#each currentPanel.assetPath as src}
					{#each layers[src] as option}
						<AssetOption
							src={`/veBanny/${src}/${option}.png`}
							alt={`Option ${option}`}
							scale={currentPanel.scale}
							translateY={currentPanel.translateY}
							translateX={currentPanel.translateX}
							on:click={() => {
								values.update((state) => ({
									...state,
									[src]: option
								}));
							}}
						/>
					{/each}
				{/each}
			{/if}
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
	<!-- TODO reset button -->
	<p />
	<!-- <button on:click={upload}>Upload to IPFS</button> -->
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
		box-shadow: 0px 3.68px 3.68px 0px rgba(0, 0, 0, 0.05);
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

	.character {
		width: 200px;
		cursor: pointer;
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
		margin-top: 2rem;
		overflow: scroll;
		max-height: calc(100% - 125px);
	}

	.panel {
		background-color: var(--background-l0);
		max-width: 450px;

		text-align: center;
	}
	.controls {
		display: flex;
		height: 100vh;
		max-height: 825px;
		z-index: 30;
	}

	@media screen and (max-width: 600px) {
		.character {
			width: 150px;
		}

		.img-button {
			width: 60px;
		}
	}

	@media (min-width: 900px) {
		.panel {
			width: 500px;
		}
	}
</style>
