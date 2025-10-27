<script lang="ts">
	import Breadcrumbs from "$lib/components/layouts/Breadcrumbs.svelte";
	import Card from "$lib/components/ui/Card.svelte";

	import { onMount } from "svelte";
	import { userStore } from "$lib/stores/userStore.svelte";
	import * as goalsApi from "$lib/api/goals";
	import * as tasksApi from "$lib/api/tasks";
	import type { Goal } from "$lib/types/types";

	let goals = $state<Goal[]>([]);
	let loading = $state(true);
	let error = $state<string | null>(null);

	// Защита от прямого захода без пользователя
	$effect(() => {
		if (
			!userStore.currentUser ||
			userStore.currentUser.role !== "employee"
		) {
			// Можно редиректить на '/', но для SPA достаточно показать ошибку
			error = "Пользователь не выбран или не является сотрудником";
			loading = false;
		}
	});

	// Загрузка целей и связанных задач
	onMount(async () => {
		if (!userStore.currentUser) return;

		try {
			loading = true;
			error = null;

			// 1. Загружаем цели сотрудника
			const userGoals = await goalsApi.getByAuthor(
				userStore.currentUser.id
			);

			// 2. Для каждой цели — загружаем задачи по taskIds
			const goalsWithTasks = await Promise.all(
				userGoals.map(async (goal) => {
					const tasks = await tasksApi.getByIds(goal.taskIds);
					return {
						...goal,
						tasks,
					};
				})
			);

			goals = goalsWithTasks;
		} catch (err) {
			console.error("Ошибка загрузки целей:", err);
			error = "Не удалось загрузить цели";
		} finally {
			loading = false;
		}
	});
</script>

<Breadcrumbs
	items={[
		{ title: "Главная", href: "#/employee" },
		{ title: "Цели и задачи" },
	]}
/>

<div class="conteiner_title">
	<h1>Мои цели</h1>
</div>

{#if loading}
	<p>Загрузка целей...</p>
{:else if error}
	<p class="error">{error}</p>
{:else if goals.length === 0}
	<p>У вас пока нет целей.</p>
{:else}
	<div class="goals-grid">
		{#each goals as goal}
			<a href="#/employee/goals/{goal.id}" class="goal-link">
				<Card
					title={goal.title}
					layout="vertical"
					description={`Срок: до ${goal.deadline}`}
				>
					<h3>Задачи ({goal.taskIds.length})</h3>
					<ul>
						{#each goal.tasks as task}
							<li>{task.title}</li>
						{/each}
					</ul>
				</Card>
			</a>
		{/each}
	</div>
{/if}

<a href="#/employee/goals/new" class="btn primary">+ Новая цель</a>

<style>
	.goals-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.25rem;
		align-items: stretch; /* ← все ячейки растягиваются по высоте */
	}

	.goal-link {
		display: block;
		height: 100%; /* ← ссылка занимает всю высоту ячейки */
		text-decoration: none;
		color: inherit;
	}

	/* Убедимся, что Card тоже растягивается */
	.goal-link :global(.card) {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	/* Контент внутри карточки должен заполнять пространство */
	.goal-link :global(.card__content) {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	/* Описание и children не должны сжиматься */
	.goal-link :global(.card__description) {
		flex-shrink: 0;
	}

	.goal-link :global(.card h3) {
		margin-top: auto;
		margin-bottom: 0.5rem;
		flex-shrink: 0;
	}

	.goal-link :global(.card ul) {
		margin: 0;
		padding-left: 1.25rem;
		flex-shrink: 0;
	}
</style>
