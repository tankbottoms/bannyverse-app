<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import type Store from '$utils/Store';
	import { getSvgForKey } from '$lib/getSvg';
	import Button from '$lib/Components/Button.svelte';
	import Popover from '$lib/Components/Popover.svelte';

	import backgrounds from '$data/backgroundGifs.json';

	let currentBanny = getContext('currentBanny') as any;
	let values = currentBanny.layers;
	let name = currentBanny.name;
	let backgroundKeys = Object.keys(backgrounds);

	let background = '';
	name.subscribe(() => {
		background = $name;
	});

	let unit = 'vw';
	let width = 20;
	let bannyStyles = '';
	let placeholderStyles = '';
	let loading = true;

	function resize() {
		// TODO clean this up,
		if (window.innerWidth < 768) {
			width = 250;
			bannyStyles = `width: ${width * 3}px; bottom: -78px`;
			unit = 'px';
			// } else if (window.innerWidth > 1600) {
			// 	width = 300;
			// 	bannyStyles = 'bottom: -50px';
			// 	placeholderStyles = `width: ${width / 1.08}px; margin-left: 65px`;
			// 	unit = 'px';
		} else if (window.innerWidth > 768) {
			width = 280;
			bannyStyles = `width: ${width * 3}px; bottom: -50px`;
			unit = 'px';
		}
		placeholderStyles = `width: ${width / 1.08}px; margin-left: 65px`;
	}

	function nextBackground(forward = true) {
		let backgroundIndex = backgroundKeys.indexOf(background);
		if (forward) {
			backgroundIndex = (backgroundIndex + 1) % backgroundKeys.length;
		} else {
			backgroundIndex = (backgroundIndex <= 0 ? backgrounds.length - 1 : backgroundIndex - 1) % backgrounds.length;
		}
		background = backgroundKeys[backgroundIndex];
	}

	$: {
		if(!backgrounds[background] && !backgrounds[$name]) {
			background = backgroundKeys[0];
		}

	}

	onMount(() => {
		resize();
		loading = false;
	});
</script>

<svelte:window on:resize={resize} />

<div
	class="container"
	style="background-image: url(/composer/character-backgrounds/{backgrounds[background]})"
>
	<img src="/composer/arrow.png" alt="arrow" class="arrow" on:click={() => nextBackground(false)}/>
	<img src="/composer/arrow.png" alt="arrow" class="arrow" on:click={() => nextBackground()}/>
	<!-- TODO question mark with history -->
	{#if loading}
		<div />
	{:else if $values && $values.Face === ''}
		<div class="unknown" out:fade in:fade>
			<h1 style={'margin-left: 75px'}>???????</h1>
			<img style={placeholderStyles} src="/composer/greybanny.png" alt="Unknown Banny" />
		</div>
	{:else}
		<div class="banny" style={bannyStyles} in:fade>
			<svg
				viewBox="0 0 290 290"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
			>
				{#each Object.keys($values) as key}
					{#await getSvgForKey({ key, value: $values[key] }) then href}
						{#if href}
							<image
								in:fade={{ duration: 50 }}
								out:fade={{ duration: 250 }}
								xlink:href={href}
								x="50%"
								y="50%"
								width={`${width}${unit}`}
								style={`transform: translate(-${width / 2}${unit}, -${width / 2}${unit})`}
							/>
						{/if}
					{/await}
				{/each}
			</svg>
		</div>
	{/if}
	<div class="overview">
		<!-- TODO chosen items -->
		<!-- TODO total -->
		<!-- TODO button -->
		<div>...</div>
		<Popover message="Coming soon" placement="top">
			<img width="100" slot="content" src="/composer/great.png" alt="Thumbs up Banny" />
			<Button disabled type="light" size="small">Mint Banny</Button>
		</Popover>
	</div>
</div>

<style>
	h1 {
		color: white;
		font-size: 2em;
		margin: 0;
	}

	.arrow {
		position: absolute;
		z-index: 1000;
		height: 150px;
    	bottom: calc(50% - 75px);
		cursor: pointer;
	}
	
	.arrow:first-of-type {
	    left: 0;
	}

	.arrow:last-of-type {
	    right: 0;
		transform: rotate(180deg);
	}

	.banny {
		width: 100%;
		max-width: 750px;
		position: absolute;
		overflow: hidden;
	}

	.container {
		height: 100vh;
		max-height: 825px;
		width: 100%;
		position: relative;
		display: flex;
		align-items: end;
		justify-content: center;
		background-position: center;
		background-size: cover;
	}

	.overview {
		display: flex;
		justify-content: space-between;
		background: var(--background-l2);
		height: 50px;
		width: 100%;
		position: absolute;
		padding: 5px;
	}

	.unknown {
		display: flex;
		flex-direction: column;
		align-items: baseline;
		margin-bottom: 60px;
		position: absolute;
	}
</style>
