<script lang="ts">
	import { setContext } from 'svelte';
	import Store from '$utils/Store';

	import Banny from './Banny.svelte';
	import ComposerMenu from './ComposerMenu.svelte';

	const layerOptions = {
		Background: '',
		Body: '',
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

<Banny />
<ComposerMenu />
