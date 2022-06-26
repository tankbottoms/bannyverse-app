<script>
	import Ethereum from './Ethereum.svelte';

	export let alt;
	export let scale;
	export let src;
	export let translateY;
	export let translateX;
	export let active;
	export let disabled;
</script>

<!-- NOTE the svg is the background svg for an item -->
<div class="container" class:disabled>
	<svg
		class:active
		width="92"
		height="92"
		viewBox="0 0 92 92"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g filter="url(#filter0_d_332_2065)">
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M83.3958 0.0788574H6.90062V6.53026H0.449219V83.9471H6.90062V89.4768H83.3958V83.9471H89.8472V6.53026H83.3958V0.0788574Z"
				fill="#FFF9F2"
				stroke={active && '#1ad3f0'}
				stroke-width="2"
			/>
		</g>

		<defs>
			<filter
				id="filter0_d_332_2065"
				x="0.449219"
				y="0.0788574"
				width="91.2412"
				height="91.2412"
				filterUnits="userSpaceOnUse"
				color-interpolation-filters="sRGB"
			>
				<feFlood flood-opacity="0" result="BackgroundImageFix" />
				<feColorMatrix
					in="SourceAlpha"
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset dx="1.84326" dy="1.84326" />
				<feComposite in2="hardAlpha" operator="out" />
				<feColorMatrix
					type="matrix"
					values="0 0 0 0 0.699809 0 0 0 0 0.71856 0 0 0 0 0.720833 0 0 0 1 0"
				/>
				<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_332_2065" />
				<feBlend
					mode="normal"
					in="SourceGraphic"
					in2="effect1_dropShadow_332_2065"
					result="shape"
				/>
			</filter>
		</defs>
	</svg>
	<img
		width="90"
		height="90"
		{alt}
		{src}
		on:click
		style={`transform: scale(${scale}) translateY(${translateY || 0}px) translateX(${
			translateX || 0
		}px);`}
	/>
	<div class="description">
		<span>0.1<Ethereum /></span>
	</div>

	<!-- <img class="background" src="/composer/Back_for_character_2.svg" /> -->
</div>

<style>
	.container {
		position: relative;
		margin: 5px 5px 0px;
		overflow: hidden;
		font-size: 12px;
	}

	.description {
		position: absolute;
		bottom: 7px;
		left: 10px;
		width: 70px;
		background: rgba(255, 249, 242, 0.8);
	}

	.disabled {
		opacity: 0.5;
	}

	img {
		position: absolute;
		left: 0;
	}

	div {
		display: inline-block;
	}
</style>
