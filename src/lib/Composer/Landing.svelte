<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import Button from '$lib/Components/Button.svelte';
	import { getStars } from './utils';
	import { onMount } from 'svelte';

	export let showWelcome: boolean = true;

	let innerWidth = 1000;
	let innerHeight = 800;

	const stars = getStars(innerWidth, innerHeight, 15);

	function isSmall() {
		return innerWidth < 450;
	}

	function shouldHide(left: number, right: number) {
		return left >= 400 || right >= 400;
	}

	const positionStyleCss = stars.map(
		({ size, left, right, top, bottom }) => `
            transform: scale(${size});
            left: ${left}px;
            right: ${right}px;
            top: ${top}px;
            bottom: ${bottom}px;
            animation-delay: ${Math.random() * 7}s;
			display: ${isSmall && shouldHide(left, right) && 'none'}
    `
	);

	onMount(() => {
		// Don't allow scrolling when showWelcome is on
		if (showWelcome) {
			document.body.style.overflow = 'hidden';
		}
	});

	$: {
		if(!showWelcome) {
			document.body.style.overflow = 'auto';
		}
	}
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<section>
	<img src="/landing/Planet_1.svg" alt="Planet 1" id="planet1" />
	<img src="/landing/Planet_2.svg" alt="Planet 2" id="planet2" />
	<img src="/landing/Planet_3.svg" alt="Planet 3" id="planet3" />
	<img src="/landing/Planet_4.svg" alt="Planet 4" id="planet4" />
	{#each positionStyleCss as star}
		<img src="/landing/Star.svg" alt="Star" class="star" style={star} />
	{/each}
	<img src="/landing/landingText.svg" alt="The Banny Verse" id="landingText" />
	<!-- <h1>The Banny Verse</h1> -->
	{#if showWelcome}
		<div transition:fly={{ x: 500, duration: 1000 }} class="welcome">
			<p>
				Hello. Welcome to the Bannyverse. If you have made it here that means that you have
				successfully staked your VeBanny on Juicebox. The Bannyverse allows you to customize your
				VeBanny to your liking. Change your outfit and boost your powers in order to get ready for
				the Banny battlefield!
			</p>

			<Button
				on:click={() => {
					showWelcome = false;
				}}>Enter the Banny verse</Button
			>
		</div>
	{:else}
		<img src="landing/bannyRocket.png" alt="Banny in a rocket" id="rocket" />
		<a in:fade={{ duration: 200, delay: 1000 }} href="#bannyComposer" class="gap">
			<Button>CUSTOMIZE YOUR VeBANNY</Button>
		</a>
	{/if}
</section>

<style>
	section {
		position: relative;
		background: black;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100vw;
		height: 100vh;
		text-align: center;
		margin-top: 20px;
	}

	/* NOTE: skewed Star Wars text, use for the ultra long text flow thingy that is to come */
	/* h1 {
		font-size: 10vw;
		color: white;
		margin-bottom: 0;
		transform-origin: 50% 100%;
		transform: perspective(400px) rotateX(20deg);
	} */

	p {
		font-family: DM Mono;
		font-size: 22px;
		font-weight: 500;
		line-height: 36px;
		letter-spacing: 0em;
		text-align: center;
		color: white;
		max-width: 745px;
		margin-top: 50px;

		bottom: 20px;

		background: black;
	}

	a {
		margin-top: 10px;
	}

	.gap {
		margin-top: 50px;
	}

	.welcome {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	[id*='planet'] {
		z-index: 10;
	}
	[id*='planet'],
	.star {
		position: absolute;
	}

	.star {
		opacity: 0;
		animation: fadeIn 5s ease-in-out infinite;
	}

	/* Animate rocket entrace from left to right */
	#rocket {
		top: 50vh;
		width: 300px;
		position: absolute;
		animation: rocketEntrance 1s ease-in-out forwards;
	}

	@keyframes rocketEntrance {
		0% {
			transform: translateX(-100vw);
		}
		100% {
			transform: translateX(30vw);
		}
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	#planet1 {
		top: 10px;
		right: 20px;
	}

	#planet2 {
		top: 10px;
		left: 100px;
	}

	#planet3 {
		top: 200px;
		left: 30px;
	}

	#planet4 {
		bottom: 50px;
		right: 20px;
	}

	#planet1 {
		animation: planet1 10s infinite;
	}

	@keyframes planet1 {
		0% {
			transform: translate(0, 0);
		}
		50% {
			transform: translate(5px, 10px);
		}
		100% {
			transform: translate(0, 0px);
		}
	}

	#planet2 {
		animation: planet2 10s infinite;
	}

	@keyframes planet2 {
		0% {
			transform: translate(0, 0);
		}
		50% {
			transform: translate(10px, 0px);
		}
		100% {
			transform: translate(0, 0px);
		}
	}

	#planet3 {
		animation: planet3 60s infinite;
	}

	@keyframes planet3 {
		0% {
			transform: translate(0, 0);
		}
		100% {
			transform: translate(0, 0) rotate(360deg);
		}
	}

	#planet4 {
		animation: planet4 10s infinite;
	}

	@keyframes planet4 {
		0% {
			transform: translate(0, 0);
		}
		50% {
			transform: translate(-5px, 10px);
		}
		100% {
			transform: translate(0, 0px);
		}
	}

	@media screen and (max-width: 745px) {
		#landingText {
			max-width: 100vw;
		}

		p {
			font-size: 18px;
			line-height: 30px;
			padding: 0px 20px;
		}

		[id*='planet'] {
			max-width: 50px;
		}

		#planet2 {
			max-width: 100px !important;
		}

		#planet3 {
			top: 280px;
		}

		#rocket {
			width: 150px;
		}
	}
</style>
