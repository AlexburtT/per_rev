<script lang="ts">
	import { iconMap } from "../icons/iconMap";

	interface Props {
		variant?: "primary" | "secondary" | "outline" | "danger";
		disabled?: boolean;
		type?: "button" | "submit" | "reset";
		title?: string;
		iconName?: keyof typeof iconMap;
		iconPosition?: "left" | "right";
		isIconOnly?: boolean;
		onClick?: () => void;
	}

	const {
		type = "button",
		disabled = false,
		variant = "primary",
		title,
		iconName,
		iconPosition,
		isIconOnly,
		onClick,
	}: Props = $props();

	let Icon = $derived(iconName ? iconMap[iconName] : undefined);
</script>

<button
	{type}
	{disabled}
	onclick={onClick}
	class="btn {variant} {disabled ? 'btn__disabled' : ''} {isIconOnly
		? 'btn__icon-only'
		: ''}"
>
	{#if Icon}
		{#if !iconPosition && !title}<Icon />{/if}
	{/if}
	{#if Icon}
		{#if iconPosition === "left"}<Icon />{/if}
	{/if}
	{#if title}<span class="btn__text">{title}</span>{/if}
	{#if Icon}
		{#if iconPosition === "right"}<Icon />{/if}
	{/if}
</button>
