<script lang="ts">
	import gifs from '$data/bannyGifs.json';
	import nameToBucket from '$data/charactersNameToBucket.json';
	import characters from '$data/characters.json';
	import { onMount } from 'svelte';

	let bannies = [];

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
		gifs.forEach((gif) => {
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

	console.log(gifs);
</script>

<section class="grid">
	{#each bannies as bannie}
		<img src={bannie.src} alt={bannie.name} id={bannie.name} />
	{/each}
</section>

<style>
	img {
		height: 100%;
		width: 100%;
		object-fit: cover;
		border-radius: 5%;
	}
	.grid {
		max-width: 1180px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		grid-template-rows: repeat(auto-fit, 240px);
		grid-gap: 1rem;
		grid-auto-flow: dense;
	}

	.grid > img:nth-child(2), #Ivar_the_Boneless {
		grid-column: span 2; /* Spans two columns */
		grid-row: span 2; /* Spans two rows */
	}

	#Banny_Potter {
		grid-column: span 1;
		grid-row: span 1;
	}

	.grid > img:nth-child(3) {
		grid-column: span 1; /* Spans two columns */
		grid-row: span 1; /* Spans two rows */
	}
	/* This will create 2x images every 3 elements */
	.grid > img:nth-child(3n) {
		grid-column: span 1; /* Spans two columns */
		grid-row: span 2; /* Spans two rows */
	}

	/* This will create 3x images every 5 elements */
	.grid > img:nth-child(5n) {
		grid-column: span 2;
		grid-row: span 3;
	}
</style>
