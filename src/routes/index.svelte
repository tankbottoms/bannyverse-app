<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { fade } from 'svelte/transition';
	import Background from '$lib/Background.svelte';
	import { getSvg, getSvgForKey } from '$lib/getSvg';
	import { IPFS } from '$lib/ipfs';
	import Store from '$utils/Store';
	import { options as layers } from '$lib/layerOptions';

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

	const values = new Store<Record<string, string>>(layerOptions);

	let minted = '';

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

	async function upload() {
		const ipfs = await IPFS.create({
			repo: 'ipfs-' + Math.random()
		});
		const { cid } = await ipfs.add(
			JSON.stringify({
				name: `Juicebox #${1}`,
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
		minted = `https://cloudflare-ipfs.com/ipfs/${cid.toString()}`;
		console.log(minted);
	}

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
	{#if minted}
		{#await getNFTUrl(minted) then src}
			<img {src} alt="" />
			<span class="metedata-url">{minted}</span>
		{/await}
	{:else}
		<Background>
			{#each Object.keys(layerOptions) as key}
				{#await getSvgForKey({ key, value: $values[key]}) then href}
					<image
						in:fade={{ duration: 50 }}
						out:fade={{duration: 250}}
						xlink:href={href}
						x="50%"
						y="50%"
						width="250"
						style="transform: translate(-125px, -125px);"
					/>
				{/await}
			{/each}
		</Background>

		<div class="controls">
			{#each Object.entries(layers) as [key, options]}
				<div class="control">
					<label for={key}>{key}</label>
					<select name={key} bind:value={$values[key]}>
						<option value="">None</option>
						{#each options as option}
							<option value={option}>{option}</option>
						{/each}
					</select>
				</div>
			{/each}
		</div>

		<p />
		<button on:click={upload}>Upload to IPFS</button>
	{/if}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
	.controls {
		margin-top: 2rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.control {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	label {
		font-size: 0.75rem;
		font-weight: bold;
		margin-bottom: 0.25rem;
	}
	button {
		margin-top: 1rem;
	}

	.metedata-url {
		margin-top: 2rem;
	}
</style>
