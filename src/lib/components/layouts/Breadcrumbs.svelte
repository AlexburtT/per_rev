<script lang="ts">
	import {
		employeeBreadcrumbs,
		goalBreadcrumbs,
		EMPLOYEE_PAGES,
	} from "$lib/utils/breadcrumbs";

	interface Props {
		hashPath: string;
		goalTitle?: string | null;
	}

	const { hashPath, goalTitle = null }: Props = $props();

	const breadcrumbs = $derived(
		/^\/employee\/goals\/[^/]+$/.test(hashPath)
			? goalBreadcrumbs(goalTitle || "Новая цель")
			: hashPath === "/employee/goals/new"
				? [
						...employeeBreadcrumbs("/employee/goals"),
						{ title: "Новая цель" },
					]
				: hashPath in EMPLOYEE_PAGES
					? employeeBreadcrumbs(hashPath)
					: hashPath === "/employee"
						? employeeBreadcrumbs(hashPath)
						: []
	);
</script>

<nav aria-label="Хлебные крошки" class="breadcrumbs">
	{#each breadcrumbs as item, i}
		{#if i > 0}<span class="breadcrumbs__separator"> / </span>{/if}

		{#if i === breadcrumbs.length - 1}
			<!-- Текущая страница — не ссылка, яркий цвет -->
			<span class="breadcrumbs__current">{item.title}</span>
		{:else if item.href}
			<!-- Предыдущие — серые ссылки с ховером -->
			<a href={item.href} class="breadcrumbs__link">{item.title}</a>
		{:else}
			<!-- На всякий случай: не ссылка и не последняя (маловероятно) -->
			<span class="breadcrumbs__inactive">{item.title}</span>
		{/if}
	{/each}
</nav>

<style>
	.breadcrumbs {
		/*display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.25rem;*/
		font-size: 0.875rem;
		color: var(--text-tertiary);
		/*margin-bottom: 1.5rem;*/
	}

	.breadcrumbs__separator {
		color: var(--text-tertiary);
		user-select: none;
	}

	.breadcrumbs__link {
		color: var(--text-tertiary);
		text-decoration: none;
		transition: color 0.2s;
	}

	.breadcrumbs__link:hover {
		color: var(--primary);
		text-decoration: underline;
	}

	.breadcrumbs__current {
		color: var(--primary); /* или var(--primary), если хочешь акцент */
		font-weight: 500;
	}
</style>
