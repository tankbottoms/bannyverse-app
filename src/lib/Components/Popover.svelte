<script lang="ts">
	export let message: string;
	export let placement: 'left' | 'right' | 'top' | 'bottom' = 'left';

	// Potentially borrow calcualte function from here: https://github.com/vaheqelyan/svelte-popover/blob/master/src/Content.svelte
</script>

<div class="wrapper">
	<slot />
	<div id="popover" class={`content ${placement}`}>
		<slot name="content" />
		<p class="message">{message}</p>
	</div>
</div>

<style>
	.wrapper {
		position: relative;
		display: inline-block;
	}
	.content {
		opacity: 0;
		visibility: hidden;
		position: absolute;
		transform: translate(0, 10px);
		padding: 12px 16px;

		background: var(--background-l0);
		box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
		max-width: max-content;
		width: 200px;
	}

	.left {
		top: -20px;
		left: -170px;
		transform: translate(0, -20px);
	}

	.right {
		top: -50px;
		left: -170px;
		transform: translate(0, -20px);
	}

	.top {
		top: -150px;
		transform: translate(0, 20px);
	}

	.wrapper:hover .content {
		z-index: 10;
		opacity: 1;
		visibility: visible;
		transition: all 0.5s cubic-bezier(0.75, -0.02, 0.2, 0.97);
	}

	#popover {
		border: 1px solid var(--stroke-tertiary);
	}
	#popover .message {
		font-weight: 300;
		font-size: 12px;
		color: var(--text-primary);
		margin: 0;
		text-align: left;
	}
</style>
