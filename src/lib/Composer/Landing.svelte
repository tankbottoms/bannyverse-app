<script lang="ts">
	const stars = [
		{
			size: 0.5,
			left: 100
		},
		{
			size: 1.2,
			right: 100
		},
		{
			size: 1,
			top: 20
		},
		{
			size: 0.3,
			bottom: 80,
			left: 100
		},
		{
			size: 0.8,
			left: 100,
			bottom: 180
		},
		{
			size: 0.9,
			top: 200,
			right: 150
		},
		{
			size: 0.7,
			left: 200,
			top: 140
		},
		{
			size: 0.3,
			left: 300,
			top: 250
		},
		{
			size: 0.5,
			bottom: 100
		},
		{
			size: 0.3,
			bottom: 150,
			left: 300
		},
		{
			size: 0.3,
			bottom: 80,
			right: 300
		},
		{
			size: 0.3,
			bottom: 15,
			left: 400
		}
	];

	let innerWidth = 1000;
	let innerHeight = 800;

	function randomStar() {
		const star = {
			size: Math.random() * 0.5 + 0.1,
			top: undefined,
			left: undefined,
			right: undefined,
			bottom: undefined
		};

		if (Math.random() > 0.5) {
			star.right = Math.random() * innerWidth;
			star.top = Math.random() * innerHeight;
		} else {
			star.left = Math.random() * innerWidth;
			star.bottom = Math.random() * innerHeight;
		}

		return star;
	}

	const randomStars = Array.from({ length: 15 }, () => randomStar());

	function isSmall() {
		return innerWidth < 450;
	}

	function shouldHide(left: number, right: number) {
		return left >= 400 || right >= 400;
	}

	const positionStyleCss = [...stars, ...randomStars].map(
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
	<p>
		Hello. Welcome to the Bannyverse. If you have made it here that means that you have successfully
		staked your VeBanny on Juicebox. The Bannyverse allows you to customize your VeBanny to your
		liking. Change your outfit and boost your powers in order to get ready for the Banny
		battlefield!
	</p>
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
		font-size: 24px;
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
	[id*='planet'],
	.star {
		position: absolute;
	}

	.star {
		opacity: 0;
		animation: fadeIn 5s ease-in-out infinite;
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
	}
</style>
