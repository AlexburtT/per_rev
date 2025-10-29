<script lang="ts">
	import GoalDetail from "$lib/components/layouts/GoalDetail.svelte";
	import { formatDate } from "$lib/utils/date";
	let { data } = $props();
	const { goal, tasks } = data;
</script>

<svelte:head>
	<title>{goal.title}</title>
</svelte:head>

<div class="conteiner_title">
	<h2>{goal.title}</h2>
	<p>Срок: {formatDate(goal.createdAt)} - {formatDate(goal.deadline)}</p>
</div>

<GoalDetail {goal} {tasks} />

<!--<div class="goal-detail">
	<p class="goal-description">{goal.description}</p>
	<strong>Ожидаемый результат:</strong>
	<p>{goal.expectedResult}</p>

	<p>
		<strong>Статус:</strong>
		<span class="status status--{goal.status}">{goal.status}</span>
	</p>

	<div class="goal__task-card">
		<h3>Задачи:</h3>
		{#each tasks as task}
			<details class="task-item">
				<summary>{task.title}</summary>

				<p>{task.description}</p>

				<p>Ожидаемые результат:</p>
				<p>{task.expectedResult}</p>

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
			</details>
		{/each}
	</div>
</div>

<style>
	.goal__task-card {
		display: flex;
		flex-direction: column;
		border-radius: 0.3rem;
		border: 1px solid var(--text-tertiary);
		gap: 1rem;
		padding: 1rem;
		background-color: var(--surface);
	}
</style>-->
