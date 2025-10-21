<script lang="ts">
	export let variant: "primary" | "secondary" | "outline" = "primary";
	export let disabled = false;
	export let type: "button" | "submit" | "reset" = "button";
</script>

<button
	{type}
	{disabled}
	class="btn button--{variant} {disabled ? 'button--disabled' : ''}"
	on:click
>
	<slot />
</button>

<style>
	.button {
		padding: 1rem 3rem;
		border-radius: 1rem;
		font-weight: 500;
		cursor: pointer;
		border: 1px solid transparent;
	}
	.button.primary {
		background-color: #3b82f6;
		color: white;
	}
	.button.outline {
		background: transparent;
		border-color: #ccc;
		color: #333;
	}
	.button.secondary {
		background-color: #f3f4f6;
		color: #333;
	}
	.button--disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
</style>
