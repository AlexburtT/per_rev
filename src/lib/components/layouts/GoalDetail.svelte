<!-- src/lib/components/GoalDetail.svelte -->
<script lang="ts">
	import { goto } from "$app/navigation";
	import type { Goal, Task } from "$lib/types/types";
	import {
		goalStatusLabels,
		taskStatusLabels,
	} from "$lib/utils/statusLabels";
	import TaskCard from "./TaskCard.svelte";

	export let goal: Goal;
	export let tasks: Task[] = [];

	function editGoal() {
		goto(`/employee/goals/${goal.id}/edit`);
	}

	function deleteGoal() {
		if (confirm("Вы уверены, что хотите удалить цель?")) {
			// Здесь можно вызвать действие из store или API
			console.log("Удаление цели:", goal.id);
		}
	}
</script>

<!-- Описание цели -->
<div class="goal__description-card">
	<h3>Описание:</h3>
	<p>{goal.description}</p>
</div>

<!-- Ожидаемый результат -->
<div class="goal__expectation-card">
	<h3>Ожидаемый результат:</h3>
	<p>{goal.expectedResult || "Не указан"}</p>
</div>

<!-- Статус цели -->
<div class="goal-status">
	<strong>Статус:</strong>
	<span class="status status--{goal.status}">
		{goalStatusLabels[goal.status]}
	</span>
</div>

<!-- Задачи -->
<div class="goal__tasks">
	<h3>Задачи:</h3>
	<div class="goal__tasks--task">
		<TaskCard {tasks} />
	</div>
</div>

<style>
	.goal__description-card,
	.goal__expectation-card {
		padding: 1rem;
	}

	.goal__description-card h3,
	.goal__expectation-card h3 {
		margin-top: 0;
		color: var(--text-primary);
	}

	.goal-status {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem;
	}

	.goal-status .status {
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		font-weight: 500;
	}

	.status--draft {
		background-color: #fff3e0;
		color: var(--warning);
	}

	.status--submitted {
		background-color: #e3f2fd;
		color: var(--primary-medium);
	}

	.status--reviewed {
		background-color: #e8f5e9;
		color: var(--success);
	}

	.goal__tasks {
		padding: 1rem;

		h3 {
			margin-bottom: 1rem;
		}
	}

	.goal__tasks--task {
		width: 100%;
		border: 1px solid var(--text-tertiary);
		border-radius: 0.3rem;
		padding: 1rem;
		background-color: var(--surface);
		margin-left: 1rem;
	}
</style>
