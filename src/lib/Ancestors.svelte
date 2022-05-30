<section>
    <img src="/ancestors/Stars.svg" alt="stars" class="stars" />
	<img src="/ancestors/Planets.svg" alt="planets" class="planets" />
	<img src="/ancestors/Ground.svg" alt="ground" class="ground" />
    <img src="/ancestors/Smoke.svg" alt="smoke" class="smoke" />
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
