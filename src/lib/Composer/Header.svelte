<script>
	import Icon from '$lib/Components/Icon.svelte';
</script>

<header>
	<nav>
		<a href="/">
			<img src="/header/logo.svg" alt="Logo" />
		</a>
		<a href="#bannyComposer">Design</a><a href="/about">About</a><a href="#bannyGrid">Banny's</a>
	</nav>
	<nav>
		<Icon name="discord" />
		<a href="https://twitter.com/bannyverse" target="_blank" rel="noopener noreferrer">
			<Icon name="twitter" />
		</a>
		<img src="/header/juicebox.png" alt="Juicebox logo" id="jb" />
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		padding: 10px 20px;
        height: 50px;
        /* width: 100vw;
        position: absolute;
        top: 0; */
	}

	nav {
		display: flex;
		align-items: center;
		gap: 20px;
	}

	a {
		color: white;
		line-height: 0;
	}

	#jb {
		margin-bottom: 5px;
	}
</style>
