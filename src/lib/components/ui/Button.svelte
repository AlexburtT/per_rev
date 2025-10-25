<script lang="ts">
	interface Props {
		variant?: "primary" | "secondary" | "outline";
		disabled?: boolean;
		type?: "button" | "submit" | "reset";
		title?: string;
	}

	const {
		type = "button",
		disabled = false,
		variant = "primary",
		title,
	}: Props = $props();
</script>

<button
	{type}
	{disabled}
	class="btn {variant} {disabled ? 'btn--disabled' : ''}"
>
	{title}
</button>

<style>
	.btn {
		padding: 0.5rem 3rem;
		border-radius: 0.3rem;
		font-weight: 500;
		cursor: pointer;
		border: 1px solid transparent;
	}
	.btn.primary {
		background-color: var(--primary);
		color: var(--surface);
	}
	.btn.outline {
		background: transparent;
		border-color: var(--text-disabled);
		color: var(--text);
	}
	.btn.secondary {
		background-color: var(--primary-light);
		color: var(--divider);
	}
	.btn--disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
</style>
