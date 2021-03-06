<script lang="ts">
	import { getContext } from 'svelte';
	import AssetOption, { NO_PRICE } from '$lib/AssetOption.svelte';

	import characters from '$data/characters.json';
	import layers from '$data/layerOptions.json';
	import assetsMetadata from '$data/assetsMetadata.json';
	import { getPrice, MenuButtons } from './utils';

	let currentBanny = getContext('currentBanny') as any;
	let values = currentBanny.layers;
	let name = currentBanny.name;
	let characterIndex = currentBanny.characterIndex;
	let mods = currentBanny.mods;
	let open = true;

	let currentPanel = MenuButtons[0];

	// Characters number from 1 to 60
	const characterIndeces = Array.from(Array(61).keys()).slice(1);
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

	function menuButtonClick(button) {
		if (currentPanel.path === button.path) {
			open = !open;
		} else {
			currentPanel = button;
		}
	}

	// Set values from characterIndex
	function setValuesFromCharacterIndex(index: number) {
		values.set(characters[index]['layers']);
		name.set(characters[index]['metadata']['name']);
		characterIndex.set(index);
	}

	function getDisabled(layer: string, values: { [key: string]: string }) {
		// If either left hand or right hand is selected, disable both hands
		// If both hands are selected, disable left hand and disabled right hand
		if (layer === 'Both_Hands') {
			return values.Left_Hand !== 'Nothing' || values.Right_Hand !== 'Nothing';
		}
		if (['Left_Hand', 'Right_Hand'].includes(layer)) {
			return values.Both_Hands !== 'Nothing';
		}
		return false;
	}

	function changeMods(layer: string, value: string, oldValue: string) {
		let assetMetadata = { ...assetsMetadata[layer][value] };
		let oldAssetMetadata = { ...assetsMetadata[layer][oldValue] };

		if (oldAssetMetadata) {
			delete oldAssetMetadata['character_index'];
			mods.update((state) => {
				let newState = { ...state };
				for (let key in oldAssetMetadata) {
					if (newState[key] === oldAssetMetadata[key]) {
						delete newState[key];
					}
				}
				return newState;
			});
		}

		if (assetMetadata) {
			delete assetMetadata['character_index'];
			mods.update((state) => ({
				...state,
				...assetMetadata
			}));
		} else {
			return;
		}
	}

	function changeAsset(layer: string, value: string) {
		if (disabled[layer]) return;
		let oldValue = '';

		if ($values[layer] === value) {
			oldValue = $values[layer];
			values.update((state) => ({
				...state,
				[layer]: characters[$characterIndex]['layers'][layer]
			}));
			changeMods(layer, '', oldValue);
		} else {
			if (values[layer] !== 'Nothing') {
				oldValue = $values[layer];
			}
			values.update((state) => ({
				...state,
				[layer]: value
			}));
			changeMods(layer, value, oldValue);
		}
	}

	$: disabled = {
		Left_Hand: getDisabled('Left_Hand', $values),
		Right_Hand: getDisabled('Right_Hand', $values),
		Both_Hands: getDisabled('Both_Hands', $values)
	};
</script>

<div class="controls">
	{#if open}
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
					{#each currentPanel.assetPath as src}
						<!-- TODO: objects assetPath has left/right/both hands, as we go through them 
						incrementally, the prices will come out of order -->
						{#each layers[src] as option}
							{#if option !== 'Nothing'}
								<AssetOption
									src={`/veBanny/${src}/${option}.png`}
									alt={`Option ${option}`}
									scale={currentPanel.scale}
									active={$values[src] === option}
									disabled={disabled[src]}
									translateY={currentPanel.translateY}
									translateX={currentPanel.translateX}
									price={getPrice($characterIndex, src, option) || 0.5}
									on:click={() => {
										changeAsset(src, option);
									}}
								/>
							{/if}
						{/each}
					{/each}
				{/if}
			</div>
		</div>
	{/if}
	<aside>
		{#each MenuButtons as menu}
			<div
				class="img-button"
				class:active={currentPanel.path === menu.path}
				on:click={() => menuButtonClick(menu)}
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
