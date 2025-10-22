<script lang="ts">
	import Card from "$lib/components/ui/Card.svelte";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();

	console.log(data);
</script>

<div class="info-user">
	<p>Мой отдел: {data.user.department}</p>
	<p>Мой руководитель: Петров Сидор Иванович</p>
	<p>Должность: JS - разработчик</p>
	<p>Почта: {data.user.email}</p>
	<p><strong>{data.user.fullName}</strong></p>
</div>

<Card
	title="Цели и задачи"
	description="Здесь находятся ваши цели, всего сейчас 1. Вывести кол-во целей и их описание если возможно"
/>
<Card
	title="Самооценка по целям"
	description="Здесь находяится список ваших целей и самооценка по ним. Вывести общий бал, рекомендации"
/>
<Card
	title="Rewiew коллег"
	description="Здесь находятся задачи по оценке коллег, сейчас их нет. Количество сколько коллег необхолдимо проревьюить"
/>
<Card
	title="Ваши результаты"
	description="Здесь находятся пройденные полностью Performance Review с вашим результатом и комментариями. Вывести общий бал, рекомендации"
/>

<!--<p>
	Цикл: {data.cycle.name} ({data.cycle.startDate} – {data.cycle.endDate})
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
{/if}-->

<style>
	.info-user {
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
		width: 100%;
		margin-bottom: 1rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--pr-grey-light);
	}
</style>
