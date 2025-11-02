<script lang="ts">
	import { goto } from "$app/navigation";
	import * as api from "$lib/api";
	import GoalForm from "$lib/features/goal/GoalForm.svelte";
	import TasksList from "$lib/features/goal/TasksList.svelte";
	import { userStore } from "$lib/stores/userStore.svelte.js";
	import type { GoalData, TaskData } from "$lib/types/forms.js";
	import type { Task, Cycle, User } from "$lib/types/types.js";
	import {
		mapGoalFormDataToEntity,
		mapTaskFormDataToEntity,
	} from "$lib/utils/mapFormDataToEntry.js";

	let { data } = $props();
	const user: User = data.user;
	const activeCycle: Cycle = data.activeCycle;

	let draftTasks = $state<Task[]>([]);

	// ✅ Чистая функция: обработка создания задачи
	const handleTaskCreate = (formData: TaskData) => {
		if (draftTasks.length >= 3) return;
		const task = mapTaskFormDataToEntity(formData, user);
		draftTasks = [...draftTasks, task];
	};

	//Сохранение цели
	const handleGoalSubmit = async (goalData: GoalData) => {
		if (draftTasks.length === 0) {
			alert("Добавьте хотя бы одну ключевую задачу.");
			return;
		}

		try {
			// Сохраняем задачи
			// Делаем снапшот — получаем обычные объекты
			const plainTasks = $state.snapshot(draftTasks);
			const taskIds: string[] = [];
			for (const task of plainTasks) {
				await api.tasks.createTask(task); // ← теперь task — обычный объект
				taskIds.push(task.id);
			}

			// Создаём цель
			const goal = mapGoalFormDataToEntity(
				goalData,
				user,
				activeCycle,
				taskIds
			);

			await api.goals.saveGoal(goal);
			userStore.goals = [...userStore.goals, goal];
			await goto("#/employee/goals");
		} catch (err) {
			console.error("Ошибка сохранения:", err);
			alert("Не удалось сохранить цель.");
		}
	};
</script>

<svelte:head>
	<title>Новая цель</title>
</svelte:head>

<div class="conteiner__title">
	<h1>Новая цель</h1>
</div>

<div class="goal__conteiner">
	<GoalForm
		authorId={user.id}
		{user}
		tasks={draftTasks}
		onSuccess={handleGoalSubmit}
		onTaskCreate={handleTaskCreate}
	/>
	<TasksList />
</div>
