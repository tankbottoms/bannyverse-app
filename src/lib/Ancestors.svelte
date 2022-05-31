<script lang="ts">
	import nameToBucket from '$data/charactersNameToBucket.json';

	// TODO pasted here from ComposerMenu, put in utility
	// or potentially change the script
	function getPathFromCharacter(number: number) {
		if (number < 10) {
			return `/characters/0${number}.png`;
		}
		return `/characters/${number}.png`;
	}

	/*
	TODO: keep the main banny constant but the other ones can be random each load
	*/
	const crew = [
		nameToBucket.Pamela_Anderson,
		nameToBucket.Spock,
		nameToBucket.Nammu,
		nameToBucket.Farceur,
		nameToBucket.Spider_Jerusalem
	];

	const scale = [0.5, 0.75, 1, 0.75, 0.5];
	const compensateBottom = [12, 8.5, 5, 8.5, 12];
</script>

<section>
    <img src="/ancestors/Stars.svg" alt="stars" class="stars" />
	<img src="/ancestors/Planets.svg" alt="planets" class="planets" />
	<img src="/ancestors/Ground.svg" alt="ground" class="ground" />
	<img src="/ancestors/Smoke.svg" alt="smoke" class="smoke" />
    
	<h1>Who are your ancestors?</h1>

	<div class="crew">
		{#each crew as bucket, index}
			<div class="crew-member" style={`bottom: -${compensateBottom[index]}vw`}>
				<img
					style={`transform: scale(${scale[index]})`}
					src={getPathFromCharacter(bucket)}
					alt="crew"
				/>
			</div>
		{/each}
	</div>
</section>

<style>
	section {
		background-image: url(/ancestors/Background.svg);
		background-size: cover;
		background-position: center;
		height: 100vh;
		width: 100vw;

		margin-bottom: 40px;

		position: relative;
		overflow: hidden;
	}

	h1 {
		font-family: 'GalacticaGrid', sans-serif;
		max-width: 450px;
		color: white;
		margin: 0 auto;
		margin-top: 5rem;
		font-size: 56px;
        position: relative;
	}

	.crew {
		position: absolute;
		bottom: 50px;
		display: flex;
		justify-content: center;
		align-items: baseline;
		width: 100vw;
	}

	.crew-member {
		max-width: 300px;
		display: inline-flex;
		align-items: baseline;
		justify-content: center;
		position: relative;
		flex: 1;
	}

	.crew-member img {
		max-height: 50vw;
	}

	.ground {
		position: absolute;
		bottom: 0;
		width: 100vw;
	}

	.planets {
		position: absolute;
		bottom: 200px;
		margin-left: 20%;
	}

	.smoke {
		position: absolute;
		top: 200px;
		width: 100vw;
	}

	.stars {
		position: absolute;
		top: 0;
		width: 100vw;
	}

	@media (max-width: 900px) {
		.crew-member {
			max-width: 180px;
		}
	}

	@media (max-width: 650px) {
		.crew-member {
			max-width: 100px;
		}
	}
</style>
