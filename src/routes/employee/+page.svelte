<script lang="ts">
	import Card from "$lib/components/ui/Card.svelte";
	import TargetIcon from "$lib/assets/icons/Target.svg";

	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>

<div class="info-user">
	<p>Мой отдел: {data.user.department}</p>
	<p>Мой руководитель: Петров Сидор Иванович</p>
	<p>Должность: JS - разработчик</p>
	<p>Почта: {data.user.email}</p>
	<p><strong>{data.user.fullName}</strong></p>
</div>

<svg
	width="20"
	height="20"
	viewBox="0 0 20 20"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<g clip-path="url(#clip0_30_67)">
		<path
			d="M10 18.3333C14.6024 18.3333 18.3333 14.6023 18.3333 9.99996C18.3333 5.39759 14.6024 1.66663 10 1.66663C5.39763 1.66663 1.66667 5.39759 1.66667 9.99996C1.66667 14.6023 5.39763 18.3333 10 18.3333Z"
			stroke="#303030"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M10 15C12.7614 15 15 12.7614 15 9.99996C15 7.23854 12.7614 4.99996 10 4.99996C7.23858 4.99996 5 7.23854 5 9.99996C5 12.7614 7.23858 15 10 15Z"
			stroke="#303030"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M10 11.6666C10.9205 11.6666 11.6667 10.9204 11.6667 9.99996C11.6667 9.07948 10.9205 8.33329 10 8.33329C9.07953 8.33329 8.33333 9.07948 8.33333 9.99996C8.33333 10.9204 9.07953 11.6666 10 11.6666Z"
			stroke="#303030"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</g>
	<defs>
		<clipPath id="clip0_30_67">
			<rect width="20" height="20" fill="white" />
		</clipPath>
	</defs>
</svg>

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
