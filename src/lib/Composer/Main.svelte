<script lang="ts">
	import { setContext } from 'svelte';
	import { derived } from 'svelte/store';
	import Store from '$utils/Store';

	import Banny from './Banny.svelte';
	import ComposerMenu from './ComposerMenu.svelte';
	import characters from '$data/characters.json';

	const layerOptions = {
		Background: '',
		Body: 'yellow',
		Face: '',
		Choker: '',
		Lower_Accessory: '',
		Outfit: '',
		Oral_Fixation: '',
		Headgear: '',
		Left_Hand: '',
		Right_Hand: '',
		Both_Hands: ''
	};

	const layers = new Store<Record<string, string>>(layerOptions);
	const name = new Store<string>();
	const characterIndex = new Store<number>();
	const mods = new Store<Record<string, string>>({});
	const checkout = new Store<string[]>([]);
	const changedAssets = derived([layers, characterIndex], ($values, set) => {
		// Get the characters normal layers
		const character = characters[$values[1]]?.['layers'];
		const current = $values[0];
		if (!character) return;
		// Get the layers that have changed
		const changed = Object.keys($values[0]).filter((key) => $values[0][key] !== character[key]);
		// Get the new assets
		const assets = {};
		changed.forEach((key) => {
			assets[key] = current[key];
		});
		set(assets);
	});

	setContext('currentBanny', { layers, name, characterIndex, mods, checkout, changedAssets });
</script>

<section id="bannyComposer">
	<Banny />
	<ComposerMenu />
</section>

<style>
	section {
		background-color: black;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		overflow: hidden;
	}

	@media (max-width: 650px) {
		section {
			align-items: center;
		}
	}
</style>
