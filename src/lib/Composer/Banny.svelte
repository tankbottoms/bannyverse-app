<script lang="ts">
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import type Store from '$utils/Store';
	import { getSvgForKey } from '$lib/getSvg';
	import Background from '$lib/Background.svelte';

	let values = getContext('currentBanny') as Store<Record<string, string>>;

	let width = 350;
	console.log(width / 2);
</script>

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
					{width}
					style={`transform: translate(-${width / 2}px, -${width / 2}px)`}
				/>
			{/if}
		{/await}
	{/each}
</Background>
