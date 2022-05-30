<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import type Store from '$utils/Store';
	import { getSvgForKey } from '$lib/getSvg';
	import Button from '$lib/Components/Button.svelte';

	let values = getContext('currentBanny') as Store<Record<string, string>>;

	let unit = 'vw';
	let width = 20;
	function resize() {
		if (window.innerWidth < 500) {
			width = 80;
			unit = 'vw';
		} else if (window.innerWidth < 768) {
			width = 40;
			unit = 'vw';
		} else if (window.innerWidth > 1600) {
			width = 300;
			unit = 'px';
		} else if (window.innerWidth > 768) {
			width = 20;
			unit = 'vw';
		}
	}

	onMount(() => {
		resize();
	});
</script>

<svelte:window on:resize={resize} />

<div
	class="container"
	style="background-image: url(/composer/character-backgrounds/banny-potter.gif)"
>
	<!-- TODO question mark with history -->
	{#if $values && $values.Face === ''}
		<div class="unknown">
			<h1>???????</h1>
			<img src="/composer/greybanny.png" alt="Unknown Banny" />
		</div>
	{:else}
		<div class="banny">
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
		<Button disabled type="light" size="small">Mint Banny</Button>
	</div>
</div>

<style>
	h1 {
		color: white;
		font-size: 2em;
		margin: 0;
	}
	.banny {
		width: 40vw;
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
	}
</style>
