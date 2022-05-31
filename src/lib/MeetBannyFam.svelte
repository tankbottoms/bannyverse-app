<script>
	import Button from './Components/Button.svelte';
	import { anchorId } from './BannyGrid';
</script>

<section>
	<!-- TODO: little star animations like https://codepen.io/tankbottoms/pen/vYddbXm -->
	<img id="nebula" src="/quote/Nebula.svg" alt="" />
	<img id="stars" src="/quote/Stars.svg" alt="" />
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

	.quote svg {
		padding: 20px;
	}
</style>
