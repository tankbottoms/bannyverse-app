<script lang="ts">
	import { setContext } from 'svelte';
	import Store from '$utils/Store';

	import Banny from './Banny.svelte';
	import ComposerMenu from './ComposerMenu.svelte';

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
		Both_Hands: '',
	};

	const layers = new Store<Record<string, string>>(layerOptions);
	const name = new Store<string>();
	const characterIndex = new Store<number>();
	const mods = new Store<Record<string, string>>({});

	setContext('currentBanny', { layers, name, characterIndex, mods });
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
