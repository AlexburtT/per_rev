<script lang="ts">
	import { iconMap } from "$lib/components/icons/iconMap";
	import type { Snippet } from "svelte";

	type Layout = "horizontal" | "vertical"; // Вертикальная или горизонтальная карточка

	interface Props {
		title?: string;
		description?: string; // ← сюда передаём любые детали: "3 из 5 завершены", "2 получены", "Балл: 4.2" и т.д.
		icon?: keyof typeof iconMap;
		layout?: Layout;
		children?: Snippet<[]>;
	}

	let {
		title,
		description,
		icon,
		layout = "horizontal",
		children,
	}: Props = $props();
	const IconComponent = $derived(icon ? iconMap[icon] : undefined);
</script>

<div class="card" class:card--vertical={layout === "vertical"}>
	{#if IconComponent}
		<div class="card-icon">
			<IconComponent />
		</div>
	{/if}
	<div class="card__body">
		<h2 class="card__title">{title}</h2>
		{#if description}
			<p class="card__description">{description}</p>
		{/if}
		{#if children}
			<div class="card__content">
				{@render children()}
			</div>
		{/if}
	</div>
</div>
