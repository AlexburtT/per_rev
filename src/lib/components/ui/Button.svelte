<script lang="ts">
	interface Props {
		variant?: "primary" | "secondary" | "outline";
		disabled?: boolean;
		type?: "button" | "submit" | "reset";
		title?: string;
	}

	let {
		type = "button",
		disabled = false,
		variant = "primary",
		title,
	}: Props = $props();
</script>

<button
	{type}
	{disabled}
	class="btn button--{variant} {disabled ? 'button--disabled' : ''}"
	onclick={() => console.log("click")}
>
	{title}
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
