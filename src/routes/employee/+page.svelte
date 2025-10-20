<script lang="ts">
	import type { PageProps } from "./$types";
	import { fade } from "svelte/transition";

	let visible = $state(false);

	setTimeout(() => {
		visible = true;
	}, 200);

	let { data }: PageProps = $props();

	console.log(data);
</script>

{#if visible}
	<div transition:fade>
		<h1>Страница сотрудника с задачами</h1>
		<h2>Имя сотрудника: {data.user.fullName}</h2>
		<p>Роль сотрудника: {data.user.role}</p>
		<p>Отдел сотрудника: {data.user.department}</p>
		<p>
			Цикл: {data.cycle.name} ({data.cycle.startDate} – {data.cycle
				.endDate})
		</p>

		{#if data.goals.length === 0}
			<p>Цели ещё не заданы</p>
		{:else}
			<h3>Ваши цели: ({data.goals.length})</h3>
			{#each data.goals as goal}
				<div class="goal-card">
					<h4>🎯 {goal.title}</h4>
					<p><strong>Описание:</strong> {goal.description}</p>
					<p>
						<strong>Ожидаемый результат:</strong>
						{goal.expectedResult}
					</p>
					<p><strong>Срок:</strong> {goal.deadline}</p>
					{#if goal.tasks.length > 0}
						<ul>
							{#each goal.tasks as task}
								<li>✅ {task}</li>
							{/each}
						</ul>
					{/if}
				</div>
			{/each}
		{/if}
	</div>
{/if}
