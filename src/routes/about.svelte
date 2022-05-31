<script context="module" lang="ts">
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<div class="content">
	<h1>About</h1>
	<img width="200" src="composer/great.png" alt="Banny thumbs up" />
	<p>More info on the project and the team coming soon...</p>

	<!-- TODO The BannyVerse origin story -->
	<!-- TODO Purpose of the treasury -->
</div>

<style>
	.content {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	h1 {
		font-size: 10vw;
		color: white;
		margin-bottom: 0;
		transform-origin: 50% 100%;
		transform: perspective(150px) rotateX(20deg);
	}

	p {
		color: white;
		text-align: center;
		font-weight: 300;
	}
</style>
