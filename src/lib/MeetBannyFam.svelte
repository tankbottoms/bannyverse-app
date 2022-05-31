<script>
	import { onMount } from 'svelte';
	import { anchorId } from './BannyGrid';
	import Button from './Components/Button.svelte';
	import BlinkingStar from './Components/BlinkingStar.svelte';

	const dots = 75;
	// const lgStars = 7;
	// const mdStars = 9;
	// const smStars = 15;

	let stars = [];

	function getRandomPosition() {
		const top = Math.floor(Math.random() * (window.innerHeight - 100));
		const left = Math.floor(Math.random() * (window.innerWidth - 100));
		return { top, left };
	}

	function getStars() {
		const stars = [];
		for (let i = 0; i < dots; i++) {
			const blinking = Math.random() < 0.33;
			const { top, left } = getRandomPosition();
			stars.push({ type: 'dot', blinking, top, left });
		}
		// for (let i = 0; i < lgStars; i++) {
		// 	const { top, left } = getRandomPosition();
		// 	stars.push({ type: 'large', top, left });
		// }
		// for (let i = 0; i < mdStars; i++) {
		// 	const { top, left } = getRandomPosition();
		// 	stars.push({ type: 'medium', top, left });
		// }
		// for (let i = 0; i < smStars; i++) {
		// 	const { top, left } = getRandomPosition();
		// 	stars.push({ type: 'small', top, left });
		// }
		return stars;
	}

	onMount(() => {
		stars = getStars();
	});
</script>

<section>
	<img id="nebula" src="/quote/Nebula.svg" alt="" />
	<img id="stars" src="/quote/Stars.svg" alt="" />
	<!-- NOTE: this could be large/md/small stars too, uncomment above to see https://codepen.io/tankbottoms/pen/vYddbXm -->
	<!-- If so, comment out the img stars just above -->
	{#each stars as star}
		<BlinkingStar {...star} />
	{/each}
	<img id="planet" src="/quote/Planet.svg" alt="" />
	<div class="quote">
		<img id="asteroid" src="/quote/Asteroid_belt.svg" alt="asteroid belt" />
		<h1 id="text">
			"The will to win, the desire to succeed, the urge to reach your full potential... these are
			the keys that will unlock the door to the bannyverse."
		</h1>
		<div class="callToAction">
			<a href={`#${anchorId}`}>
				<Button>Meet the Banny fam</Button>
			</a>
		</div>
	</div>
</section>

<style>
	section {
		position: relative;
		background-color: black;
		height: 100vh;
		width: 100vw;

		display: flex;
		justify-content: center;
		flex-direction: column;
	}

	#text {
		position: absolute;
		max-width: 905px;
		color: white;
		font-family: 'GalacticaGrid', sans-serif;
	}

	#asteroid {
		position: absolute;
		width: 100vw;
	}

	#nebula {
		position: absolute;
		width: 100vw;
	}

	#stars {
		position: absolute;
		width: 100vw;
	}

	#planet {
		position: absolute;
		left: 100px;
		top: 100px;
	}

	.callToAction {
		position: relative;
		top: 250px;
	}

	.quote {
		height: 100vh;
		width: 100vw;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
