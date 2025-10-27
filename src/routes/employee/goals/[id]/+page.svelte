<script lang="ts">
	import Breadcrumbs from "$lib/components/layouts/Breadcrumbs.svelte";

	import { page } from "$app/state";
	import { userStore } from "$lib/stores/userStore.svelte";
	import { onMount } from "svelte";
	import * as goalsApi from "$lib/api/goals";
	import * as tasksApi from "$lib/api/tasks";

	import Card from "$lib/components/ui/Card.svelte";
	import type { Goal, Task } from "$lib/types/types";

	const goalId = $derived(page.params.id);

	let goal = $state<Goal | undefined>(undefined);
	let tasks = $state<Task[]>([]);
	let loading = $state(true);
	let error = $state<string | undefined>(undefined);

	onMount(async () => {
		if (!userStore.currentUser) {
			error = "Пользователь не выбран";
			loading = false;
			return;
		}

		try {
			loading = true;
			goal = await goalsApi.getById(goalId);
			if (!goal || goal.authorId !== userStore.currentUser.id) {
				error = "Цель не найдена";
				return;
			}
			const loadedTasks = await tasksApi.getByIds(goal.taskIds);
			tasks = loadedTasks;
		} catch (err) {
			console.error(err);
			error = "Ошибка загрузки цели";
		} finally {
			loading = false;
		}
	});
</script>

<!--<Breadcrumbs
	items={[
		{ title: "Главная", href: "#/employee" },
		{ title: "Цели и задачи", href: "#/employee/goals" },
		{ title: goal.title },
	]}
/>-->

{#if loading}
	<p>Загрузка цели...</p>
{:else if error}
	<p class="error">{error}</p>
{:else if goal}
	<Breadcrumbs
		items={[
			{ title: "Главная", href: "#/employee" },
			{ title: "Цели", href: "#/employee/goals" },
			{ title: goal.title },
		]}
	/>

	<div class="goal-detail">
		<h1>{goal.title}</h1>
		<p class="goal-description">{goal.description}</p>
		<p><strong>Ожидаемый результат:</strong> {goal.expectedResult}</p>
		<p><strong>Срок:</strong> до {goal.deadline}</p>
		<p>
			<strong>Статус:</strong>
			<span class="status status--{goal.status}">{goal.status}</span>
		</p>

		<h2>Задачи ({tasks.length})</h2>
		{#each tasks as task}
			<div class="task-item">
				<h3>{task.title}</h3>
				{#if task.description}
					<p>{task.description}</p>
				{/if}
				<p><strong>Статус:</strong> {task.status}</p>
				{#if task.completedAt}
					<p>
						<small
							>Завершено: {new Date(
								task.completedAt
							).toLocaleDateString()}</small
						>
					</p>
				{/if}
			</div>
		{/each}
	</div>
{/if}
