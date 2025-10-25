<script lang="ts">
	interface Props {
		variant?: "primary" | "secondary" | "outline";
		disabled?: boolean;
		type?: "button" | "submit" | "reset";
		title?: string;
		onClick: () => {};
	}

	const {
		type = "button",
		disabled = false,
		variant = "primary",
		title,
		onClick,
	}: Props = $props();
</script>

<button
	{type}
	{disabled}
	onclick={onClick}
	class="btn {variant} {disabled ? 'btn--disabled' : ''}"
>
	{title}
</button>
