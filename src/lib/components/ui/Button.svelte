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
