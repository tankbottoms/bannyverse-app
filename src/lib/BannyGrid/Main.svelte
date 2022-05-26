<script lang="ts">
	import bannies from '$data/bannyGifs.json';
	console.log(bannies);
</script>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
		grid-template-rows: repeat(6, 200px);
		grid-gap: 1rem;
		grid-auto-flow: dense;
	}
</style>
