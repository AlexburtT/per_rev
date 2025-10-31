<script lang="ts">
	import { goto } from "$app/navigation";
	import { saveGoal } from "$lib/api/goals.js";
	import { createTask } from "$lib/api/tasks.js";
	import GoalForm from "$lib/features/goal/GoalForm.svelte";
	import TasksList from "$lib/features/goal/TasksList.svelte";
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
				await createTask(task); // ← теперь task — обычный объект
				taskIds.push(task.id);
			}

			// Создаём цель
			const goal = mapGoalFormDataToEntity(
				goalData,
				user,
				activeCycle,
				taskIds
			);

			await saveGoal(goal);

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

<div class="conteiner_title">
	<h1>Новая цель</h1>
</div>

<div class="newgoal__conteiner">
	<GoalForm
		authorId={user.id}
		{user}
		tasks={draftTasks}
		onSuccess={handleGoalSubmit}
		onTaskCreate={handleTaskCreate}
	/>
	<TasksList />
</div>

<style>
	.newgoal__conteiner {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 1rem;
	}
</style>
