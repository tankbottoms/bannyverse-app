<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Ancestors from '$lib/Ancestors.svelte';
	import BannyGrid from '$lib/BannyGrid';
	import Composer from '$lib/Composer';
	import Landing from '$lib/Composer/Landing.svelte';
	import MeetBannyFam from '$lib/MeetBannyFam.svelte';

	/*
		* should we make a cloud function which would generate the character, metadata and push to IPFS?
		* we will need the minter contract to operate effectively like the Tiles saving the CID in a mapping of tokenId and owner address
		* certain accessories are incompatible with others how to encode?
		* certain accessories are rarer than others how to encode?
		* add ETH pricing per accessory left, right, hat, both hands
		* whichever character  you have in your wallet you are allowed to mint from that character backwards
		* each character has a "naked" version which retains the core feature of the character directory structure in production 
			see page Banny Assets https://www.figma.com/file/p2oVgTPz0DxC1iv7LvrhdM/JBX%2FMove-DAO-Components?node-id=1487%3A23333
		* 
	*/
</script>

<svelte:head>
	<title>BannyVerse</title>
</svelte:head>

<Landing />
<Composer />
<MeetBannyFam />
<Ancestors />
<BannyGrid />
