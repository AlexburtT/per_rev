<script lang="ts">
	import logo from "$lib/assets/Wink_new.svg";
	import { clearUser } from "$lib/stores/userStore.svelte";

	import { page } from "$app/state";
	import Breadcrumbs from "$lib/components/layouts/Breadcrumbs.svelte";
	import type { BreadcrumbItem } from "$lib/components/layouts/Breadcrumbs.svelte";
	import {
		employeeBreadcrumbs,
		goalBreadcrumbs,
		EMPLOYEE_PAGES,
	} from "$lib/utils/breadcrumbs";
	import { userStore } from "$lib/stores/userStore.svelte";

	// Извлекаем путь из хеша
	const hashPath = $derived(page.url.hash.replace(/^#/, "") || "/");

	// Определяем, нужно ли показывать крошки
	const showBreadcrumbs = $derived(
		hashPath.startsWith("/employee") && hashPath !== "/"
	);
	// Генерируем крошки
	let breadcrumbs = $state<BreadcrumbItem[]>([]);

	$effect(() => {
		const path = hashPath;

		// 1. Динамические цели: /employee/goals/abc123
		if (
			path.startsWith("/employee/goals/") &&
			path.split("/").length === 4
		) {
			const goalId = path.split("/")[3];
			const goal = userStore.goals?.find((g) => g.id === goalId);
			if (goal) {
				breadcrumbs = goalBreadcrumbs(goal.title); // ← только если цель найдена
				return;
			}
		}

		// 2. Новая цель: /employee/goals/new
		if (path === "/employee/goals/new") {
			breadcrumbs = [
				{ title: "Главная", href: "#/employee" },
				{ title: "Мои цели", href: "#/employee/goals" },
				{ title: "Новая цель" },
			];
			return;
		}

		// 3. Статические страницы
		if (path in EMPLOYEE_PAGES) {
			breadcrumbs = employeeBreadcrumbs(path);
			return;
		}

		// 4. Главная employee
		if (path === "/employee") {
			breadcrumbs = employeeBreadcrumbs(path);
			return;
		}

		// 5. По умолчанию — пусто
		breadcrumbs = [];
	});
	//Для GitHub Pages необходимо или в ссылку ниже вставить /per_rev/ или base делать
</script>

<header class="app-header">
	<a href="/" onclick={() => clearUser()}>
		<img src={logo} alt="Логотип Performance Review" class="logo" />
	</a>
	{#if showBreadcrumbs && breadcrumbs.length > 0}
		<div class="header-breadcrumbs">
			<Breadcrumbs items={breadcrumbs} />
		</div>
		<div class="info-user">
			<p>
				<strong>{userStore.currentUser?.fullName}</strong>
			</p>
		</div>
	{/if}
</header>

<style>
	.app-header {
		width: 100%;
		margin-bottom: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		padding: 1rem;
		border-bottom: 1px solid var(--text-tertiary);
	}

	.logo {
		height: 3rem;
		padding-right: 2rem;
	}

	/*.info-user {
	}*/
</style>
