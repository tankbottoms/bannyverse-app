<script lang="ts">
	import { setContext } from 'svelte';
	import Store from '$utils/Store';

	import Banny from './Banny.svelte';
	import ComposerMenu from './ComposerMenu.svelte';

	const layerOptions = {
		Background: '',
		Body: 'yellow',
		Choker: '',
		Face: '',
		Headgear: '',
		Left_Hand: '',
		Lower_Accessory: '',
		Oral_Fixation: '',
		Outfit: '',
		Right_Hand: ''
	};

	const currentBanny = new Store<Record<string, string>>(layerOptions);

	setContext('currentBanny', currentBanny);
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
	}

	@media (max-width: 650px) {
		section {
			align-items: center;
		}
	}
</style>
