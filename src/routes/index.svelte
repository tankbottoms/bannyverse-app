<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Composer from '$lib/Composer';

	import { minted } from '$stores';

	// TODO where tf is the get http://localhost:3000/undefined coming from that gets logged to console?!
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

	async function getNFTUrl(metedataURI: string) {
		const response = await fetch(metedataURI);
		const json = await response.json();
		return json.image;
	}
</script>

<svelte:head>
	<title>BannyVerse</title>
</svelte:head>

<section>
	<!-- TODO put this back in later -->
	<!-- {#if minted}
		{#await getNFTUrl($minted) then src}
			<img {src} alt="" />
			<span class="metedata-url">{minted}</span>
		{/await}
	{:else} -->
	<Composer />
	<!-- {/if} -->
</section>

<style>
	section {
		/* display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		flex: 1; */
		height: 100vh;
	}

	.metedata-url {
		margin-top: 2rem;
	}
</style>
