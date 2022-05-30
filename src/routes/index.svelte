<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Landing from '$lib/Composer/Landing.svelte';
</script>

<svelte:head>
	<title>BannyVerse</title>
</svelte:head>

<Landing showWelcome />
