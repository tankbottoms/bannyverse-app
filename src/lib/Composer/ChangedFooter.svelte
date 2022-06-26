<script lang="ts">
	import { getContext } from 'svelte';
	import { getPrice, MenuButtons } from './utils';
	import AssetOption from '$lib/AssetOption.svelte';
	import characters from '$data/characters.json';

	const bannyContext = getContext('currentBanny') as any;
	const currentBannyIndex = bannyContext.characterIndex;
	const layers = bannyContext.layers;
	const changedAssets = bannyContext.changedAssets;

	function remove(layer) {
		$layers[layer] = characters[$currentBannyIndex]['layers'][layer];
	}

	$: assets = Object.keys($changedAssets || {}).map((layer) => {
		const layerData = MenuButtons.find((button) => button.assetPath.includes(layer));
		return {
			src: `/veBanny/${layer}/${$changedAssets[layer]}.png`,
			price: getPrice($currentBannyIndex, layer, $changedAssets[layer]) || 0.5,
			scale: layerData.scale,
			translateX: layerData.translateX,
			translateY: layerData.translateY,
			onClick: () => remove(layer)
		};
	});
</script>

<div>
	{#each assets as asset}
		<AssetOption alt={asset.src} size={70} {...asset} on:click={asset.onClick} />
	{/each}
</div>

<style>
	div {
		display: inline-flex;
	}
</style>
