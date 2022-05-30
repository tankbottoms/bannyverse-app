<script lang="ts">
	export let type: 'dark' | 'light' = 'dark';
	export let size: 'small' | 'medium' | 'large' = 'large';
</script>

<button on:click class={`${type} ${size}`} {...$$props}><slot /></button>

<style>
	:global(button) {
		text-transform: uppercase;
	}

	button {
		--dark-bg-color: black;
		--dark-border-color: white;
		--dark-text-color: white;

		--light-bg-color: rgba(170, 232, 210, 1);
		--light-border-color: #939393;
		--light-text-color: black;
	}

	button {
		box-sizing: border-box;

		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 76px;
		padding: 25px 60px;
		gap: 10px;

		border: 3px solid #ffffff;
		border-radius: 100px;
	}

	.dark {
		background: var(--dark-bg-color);
		box-shadow: -5px 5px 0px var(--dark-border-color);
		border-color: var(--dark-border-color);
		color: var(--dark-text-color);
	}

	.light {
		background: var(--light-bg-color);
		border-color: var(--light-border-color);
		box-shadow: -5px 5px 0px var(--light-border-color);
		color: var(--light-text-color);
	}

	.large {
		font-size: 24px;
		line-height: 36px;
	}

	button:disabled {
		cursor: not-allowed;
	}
</style>
