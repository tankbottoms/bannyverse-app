<script lang="ts">
	export let banny: Partial<Banny>;
	export let isHovered: boolean;
	export let onImageMouseover: (banny: Banny) => void;
</script>

<div class="bannyContainer" id={banny.name} on:click>
	<img
		class:active={isHovered}
		src={banny.src}
		alt={banny.name}
		on:mouseover={() => onImageMouseover(banny)}
		on:focus={() => onImageMouseover(banny)}
	/>
	{#if isHovered}
		<div class="overlay">
			<h1>{banny.name.replaceAll('_', ' ')}</h1>
			<p>{banny.motto}</p>
		</div>
	{/if}
</div>

<style>
	img {
		height: 100%;
		width: 100%;
		object-fit: cover;
		border-radius: 5%;
	}

	.bannyContainer {
		position: relative;
	}

	h1,
	p {
		color: white;
		padding: 0rem 1rem;
	}

	h1 {
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

	:global(.grid > .bannyContainer:nth-child(2)),
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

	:global(.grid > .bannyContainer:nth-child(3)) {
		grid-column: span 1;
		grid-row: span 1;
	}
	/* This will create 2x images every 3 elements */
	:global(.grid > .bannyContainer:nth-child(3n)) {
		grid-column: span 1;
		grid-row: span 2;
	}

	:global(.grid > .bannyContainer:nth-child(5n)) {
		grid-column: span 2;
		grid-row: span 3;
	}
</style>
