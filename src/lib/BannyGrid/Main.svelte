<script context="module">
	export const anchorId = 'bannyGrid';
</script>

<script lang="ts">
	import gifs from '$data/bannyGifs.json';
	import nameToBucket from '$data/charactersNameToBucket.json';
	import characters from '$data/characters.json';
	import { onMount } from 'svelte';
	import Card from './Card.svelte';
	import Modal, { bind } from '$lib/Components/Modal.svelte';
	import ModalContent from './ModalContent.svelte';

	let bannies = [];
	let hoveredImage: string;

	function onImageMouseover(bannie) {
		hoveredImage = bannie.name;
	}

	let current: undefined;

	/**
	 * Takes a gif string of form "bannible-lector.gif" and returns "Bannible_Lector"
	 */
	function nameFromGif(gif: string) {
		let name = gif.replace('.gif', '');
		name = name
			.split('-')
			.map((part: string) => {
				// Don't capitalize adverb
				if (['the'].includes(part)) return part;
				// Capitalize first letter of name
				return part.charAt(0).toUpperCase() + part.slice(1);
			})
			.join('_');
		return name.charAt(0).toUpperCase() + name.slice(1);
	}

	onMount(() => {
		gifs.forEach((gif: string) => {
			const name = nameFromGif(gif);
			const bucket = nameToBucket[name];
			if (bucket) {
				const character = characters[bucket]['metadata'];
				bannies = [...bannies, { ...character, src: `banny-grid/${gif}` }];
			} else {
				console.info('Cannot map this character: ', name);
			}
		});
	});
</script>

<section class="grid" id={anchorId}>
	{#each bannies as banny}
		<Card
			{banny}
			on:click={() => {
				current = banny;
			}}
			isHovered={hoveredImage === banny.name}
			{onImageMouseover}
		/>
	{/each}
	<Modal
		styleWindow={{ 'border-radius': '20px', background: 'black' }}
		styleCloseButton={{ 'color': 'white' }}
		show={current && bind(ModalContent, { banny: current })}
	/>
</section>

<style>
	.grid {
		max-width: 1180px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		grid-template-rows: repeat(auto-fit, 240px);
		grid-gap: 1rem;
		grid-auto-flow: dense;
	}
</style>
