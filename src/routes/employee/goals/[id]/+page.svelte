<script lang="ts">
	import { goto } from "$app/navigation";
	import * as api from "$lib/api";
	import GoalDetail from "$lib/components/layouts/GoalDetail.svelte";
	import GoalTaskCard from "$lib/components/layouts/GoalTaskCard.svelte";
	import { updateGoal, userStore } from "$lib/stores/userStore.svelte";
	import type { TaskData } from "$lib/types/forms";
	import type { Goal } from "$lib/types/types";
	import { mapTaskFormDataToEntity } from "$lib/utils/mapFormDataToEntry";

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
			await api.tasks.createTask(newTask);

			// 2. Обновляем цель: добавляем taskId
			const updatedGoal: Goal = {
				...goal,
				taskIds: [...goal.taskIds, newTask.id],
			};

			await updateGoal(updatedGoal);

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
				await api.tasks.removeTask(taskId);
			}
			// Удаляем цель
			await api.goals.removeGoal(goal.id);
			userStore.goals = userStore.goals.filter((g) => g.id !== goal.id);
			// Перенаправляем
			await goto("#/employee/goals");
		} catch (err) {
			console.error("Ошибка удаления:", err);
			alert("Не удалось удалить цель.");
		}
	};

	const handleTaskComplete = async (taskId: string) => {
		// 1. Находим задачу в локальном массиве задач
		const task = tasks.find((t) => t.id === taskId);
		if (!task) return;

		// 2. Обновляем статус задачи
		const updatedTask = {
			...task,
			status: "completed" as const,
			completedAt: new Date().toISOString(),
		};

		await api.tasks.createTask(updatedTask); // сохраняем в IndexedDB

		// 3. Обновляем локальный массив задач (если он управляется через $state)
		tasks = tasks.map((t) => (t.id === taskId ? updatedTask : t));
	};

	const handleSubmitForWork = async () => {
		if (goal.taskIds.length !== 3) {
			alert("Цель можно принять в работу только с 3 задачами.");
			return;
		}
		if (goal.status !== "draft") return;

		const updatedGoal: Goal = {
			...$state.snapshot(goal), // ← ключевое: снимаем реактивность!
			status: "submitted",
		};

		await updateGoal(updatedGoal);
		goal = updatedGoal;
	};

	const handleSubmitForSelfReview = async () => {
		const allCompleted = goal.taskIds.every((id) => {
			const t = tasks.find((task) => task.id === id);
			return t?.status === "completed";
		});

		if (!allCompleted) {
			alert("Все задачи должны быть завершены.");
			return;
		}
		if (goal.status !== "submitted") return;

		const updatedGoal: Goal = {
			...$state.snapshot(goal),
			status: "self_reviewed",
		};
		await updateGoal(updatedGoal);
		goal = updatedGoal;
	};

	const allCompleted = $derived(
		goal.taskIds.every((id) => {
			const task = tasks.find((t) => t.id === id);
			return task?.status === "completed";
		})
	);
</script>

<svelte:head>
	<title>{goal.title}</title>
</svelte:head>

<GoalDetail
	{goal}
	{canEdit}
	onEdit={handleEdit}
	onDelete={handleDelete}
	onSubmitForWork={handleSubmitForWork}
	onSubmitForSelfReview={handleSubmitForSelfReview}
	{allCompleted}
>
	<GoalTaskCard
		{tasks}
		canAddTask={canEdit}
		onTaskCreate={handleAddTask}
		onTaskComplete={handleTaskComplete}
	/>
</GoalDetail>
