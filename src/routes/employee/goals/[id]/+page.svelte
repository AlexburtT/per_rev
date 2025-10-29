<script lang="ts">
	let { data } = $props();
	const { goal, tasks } = data;
</script>

<svelte:head>
	<title>{goal.title}</title>
</svelte:head>

<div class="conteiner_title">
	<h1>{goal.title}</h1>
</div>

<div class="goal-detail">
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
