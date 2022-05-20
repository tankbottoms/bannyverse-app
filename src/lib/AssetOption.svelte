<!-- NOTE alt it's fine, overriden by props -->
<span class="container">
	<img alt="" {...$$props} on:click />
</span>

<style>
	.container {
		width: 90px;
		height: 90px;
        overflow: hidden;
	}

	img {
        width: 90px;
        height: 90px;
		transform: scale(1.5);
	}
</style>
