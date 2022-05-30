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

	const crew = [
		nameToBucket.Pamela_Anderson,
		nameToBucket.Spock,
		nameToBucket.Nammu,
		nameToBucket.Farceur,
		nameToBucket.Spider_Jerusalem
	];

	const height = [320, 480, 650, 480, 320];
    const compensateBottom = [0, 20, 40, 20, 0];
</script>

<section>
	<img src="/ancestors/Stars.svg" alt="stars" class="stars" />
	<img src="/ancestors/Planets.svg" alt="planets" class="planets" />
	<img src="/ancestors/Ground.svg" alt="ground" class="ground" />
	<img src="/ancestors/Smoke.svg" alt="smoke" class="smoke" />

	<div class="crew">
		{#each crew as bucket, index}
			<div class="crew-member" style={`bottom: -${compensateBottom[index]}px`}>
				<img height={height[index]} src={getPathFromCharacter(bucket)} alt="crew" />
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

	.crew {
		position: absolute;
		bottom: 50px;
        display: flex;
        justify-content: center;
        align-items: baseline;
        width: 100vw;
	}

	.crew-member {
		width: 300px;
		display: inline-flex;
		align-items: baseline;
		justify-content: center;
        position: relative;
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
</style>
