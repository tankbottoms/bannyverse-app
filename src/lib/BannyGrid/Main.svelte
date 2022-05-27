<script lang="ts">
	import gifs from '$data/bannyGifs.json';
	import nameToBucket from '$data/charactersNameToBucket.json';
	import characters from '$data/characters.json';
	import { onMount } from 'svelte';

	let bannies = [];
	let hoveredImage: string;

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

	function onImageMouseover(bannie) {
		hoveredImage = bannie.name;
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
</script>

<section class="grid">
	{#each bannies as bannie}
		<div class="bannieContainer" id={bannie.name}>
			<img
				class:active={hoveredImage === bannie.name}
				src={bannie.src}
				alt={bannie.name}
				on:mouseover={() => onImageMouseover(bannie)}
				on:focus={() => onImageMouseover(bannie)}
			/>
			{#if hoveredImage === bannie.name}
				<div class="overlay">
					<h1>{bannie.name.replaceAll('_', ' ')}</h1>
					<p>{bannie.motto}</p>
				</div>
			{/if}
		</div>
	{/each}
</section>

<style>
	img {
		height: 100%;
		width: 100%;
		object-fit: cover;
		border-radius: 5%;
	}

	.bannieContainer {
		position: relative;
	}

	h1,
	p {
		color: white;
		padding: 0rem 1rem;
	}

	h1 {
		/* TODO the correct motto */
		font-family: Arial, Helvetica, sans-serif;
		font-weight: 700;
		line-height: 1;
	}

	/* Create an image overlay */
	.overlay {
		position: absolute;
		height: 100%;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.5);
		color: #fff;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
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

	.grid > .bannieContainer:nth-child(2),
	#Ivar_the_Boneless {
		grid-column: span 2; /* Spans two columns */
		grid-row: span 2; /* Spans two rows */
	}

	#Banny_Potter {
		grid-column: span 1;
		grid-row: span 1;
	}

	#Ivar_the_Boneless {
		grid-column: span 2;
		grid-row: span 2;
	}

	.grid > .bannieContainer:nth-child(3) {
		grid-column: span 1;
		grid-row: span 1;
	}
	/* This will create 2x images every 3 elements */
	.grid > .bannieContainer:nth-child(3n) {
		grid-column: span 1;
		grid-row: span 2;
	}

	.grid > .bannieContainer:nth-child(5n) {
		grid-column: span 2;
		grid-row: span 3;
	}
</style>
