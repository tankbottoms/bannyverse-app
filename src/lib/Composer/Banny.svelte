<script lang="ts">
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import type Store from '$utils/Store';
	import { getSvgForKey } from '$lib/getSvg';
	import Background from '$lib/Background.svelte';

	let values = getContext('currentBanny') as Store<Record<string, string>>;

	let width = 20;
	function resize() {
		if (window.innerWidth < 500) {
			width = 50;
		} else if (window.innerWidth < 768) {
			width = 40;
		} else if (window.innerWidth > 768) {
			width = 20;
		}
	}
</script>

<svelte:window on:resize={resize} />

<Background>
	{#each Object.keys($values) as key}
		{#await getSvgForKey({ key, value: $values[key] }) then href}
			{#if href}
				<image
					in:fade={{ duration: 50 }}
					out:fade={{ duration: 250 }}
					xlink:href={href}
					x="50%"
					y="50%"
					width={`${width}vw`}
					style={`transform: translate(-${width / 2}vw, -${width / 2}vw)`}
				/>
			{/if}
		{/await}
	{/each}
</Background>

<style>
	/* :global(svg) {
		width: 300px;
		height: 300px;
	} */
</style>
