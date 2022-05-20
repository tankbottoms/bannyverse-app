<script>
	import { getContext } from 'svelte';
	import { minted } from '$stores';
	import { IPFS } from '$lib/ipfs';
	import { getSvg } from '$lib/getSvg';
	import { options as layers } from '$lib/layerOptions';

	let values = getContext('currentBanny');

	async function upload() {
		const ipfs = await IPFS.create({
			repo: 'ipfs-' + Math.random()
		});
		const { cid } = await ipfs.add(
			JSON.stringify({
				name: `Juicebox #${1}`,
                // TODO Derive attributes from character
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
		minted.set(`https://cloudflare-ipfs.com/ipfs/${cid.toString()}`);
	}
</script>

<div class="controls">
	{#each Object.entries(layers) as [key, options]}
		<div class="control">
			<label for={key}>{key.replace('_', ' ')}</label>
			<select name={key} bind:value={$values[key]}>
				<option value="">None</option>
				{#each options as option}
					<option value={option}>{option.replace('_', ' ')}</option>
				{/each}
			</select>
		</div>
	{/each}

	<p />
	<button on:click={upload}>Upload to IPFS</button>
</div>

<style>
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
</style>
