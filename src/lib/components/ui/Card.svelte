<script lang="ts">
	import { iconMap } from "$lib/components/icons/iconMap";
	import type { Snippet } from "svelte";

	type Layout = "horizontal" | "vertical"; // Вертикальная или горизонтальная карточка

	interface Props {
		title: string;
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

<style>
	.card {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
		padding: 1.25rem;
		border: 1px solid var(--divider);
		border-radius: 12px;
		background: var(--surface);
		transition: border-color 0.2s;
	}

	.card:hover {
		border-color: var(--primary);
	}

	.card:hover .card__icon {
		color: var(--primary);
	}

	/* --- Иконка --- */
	.card__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		color: var(--text-secondary);
		flex-shrink: 0;
	}

	/* --- Тело карточки --- */
	.card__body {
		flex: 1;
		min-width: 0;
	}

	/* --- Заголовок --- */
	.card__title {
		margin: 0 0 0.25rem;
		font-size: 1.125rem;
		color: var(--text);
		font-weight: 600;
	}

	/* В вертикальном режиме — макс. 2 строки */
	.card--vertical .card__title {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		line-height: 1.3;
		max-height: 2.6em;
	}

	/* --- Описание --- */
	.card__description {
		margin: 0 0 0.75rem;
		color: var(--text-secondary);
		font-size: 0.9375rem;
	}

	/* В вертикальном режиме — 1 строка */
	.card--vertical .card__description {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* --- Контент (children) --- */
	.card__content {
		margin-top: auto;
	}

	/* --- Вертикальный режим: полная перестройка --- */
	.card--vertical {
		flex-direction: column;
		align-items: center;
	}

	.card--vertical .card__body {
		width: 100%;
	}

	.card--vertical .card__icon {
		margin-bottom: 0.75rem;
	}
</style>
