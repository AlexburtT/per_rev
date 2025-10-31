<script lang="ts">
	import { goto } from "$app/navigation";
	import { removeGoal, saveGoal } from "$lib/api/goals.js";
	import { createTask, removeTask } from "$lib/api/tasks.js";
	import GoalDetail from "$lib/components/layouts/GoalDetail.svelte";
	import type { TaskData } from "$lib/types/forms.js";
	import type { Goal, Task, User } from "$lib/types/types.js";
	import { formatDate } from "$lib/utils/date";
	import { mapTaskFormDataToEntity } from "$lib/utils/mapFormDataToEntry.js";

	let { data } = $props();
	// Создаём реактивные копии
	let goal = $state($state.snapshot(data.goal));
	let tasks = $state($state.snapshot(data.tasks));
	const user = data.user;

	// Может ли пользователь редактировать цель?
	const canEdit =
		data.goal.authorId === user.id && data.goal.status === "draft";

	// === Обработчики ===

	const handleAddTask = async (taskData: TaskData) => {
		if (tasks.length >= 3) return;

		try {
			// 1. Создаём задачу
			const newTask = mapTaskFormDataToEntity(taskData, user);
			await createTask(newTask);

			// 2. Обновляем цель: добавляем taskId
			const updatedGoal: Goal = {
				...goal,
				taskIds: [...goal.taskIds, newTask.id],
			};
			await saveGoal(updatedGoal);

			// 3. Обновляем локальное состояние (без перезагрузки!)
			tasks = [...tasks, newTask];
			goal = updatedGoal;
		} catch (err) {
			console.error("Ошибка добавления задачи:", err);
			alert("Не удалось добавить задачу.");
		}
	};

	const handleEdit = () => {
		goto(`#/employee/goals/${goal.id}/edit`);
	};

	const handleDelete = async () => {
		if (!confirm("Вы уверены, что хотите удалить цель и все её задачи?"))
			return;

		try {
			// Удаляем все задачи
			for (const taskId of goal.taskIds) {
				await removeTask(taskId);
			}
			// Удаляем цель
			await removeGoal(goal.id);
			// Перенаправляем
			await goto("#/employee/goals");
		} catch (err) {
			console.error("Ошибка удаления:", err);
			alert("Не удалось удалить цель.");
		}
	};
</script>

<svelte:head>
	<title>{goal.title}</title>
</svelte:head>

<div class="conteiner_title">
	<h2>{goal.title}</h2>
	<p>Срок: {formatDate(goal.createdAt)} - {formatDate(goal.deadline)}</p>
</div>

<GoalDetail
	{goal}
	{tasks}
	{canEdit}
	onAddTask={handleAddTask}
	onEdit={handleEdit}
	onDelete={handleDelete}
/>
