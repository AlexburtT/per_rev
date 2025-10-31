<script lang="ts">
	import Card from "$lib/components/ui/Card.svelte";

	let { data } = $props();

	const goals = data.goals;
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<div class="conteiner_title">
	<h1>Dashboard</h1>
</div>

<a href="#/employee/goals">
	<Card
		icon="target"
		title="Цели и задачи"
		description={`Всего целей: ${goals.length}`}
	></Card>
</a>

<a href="#/employee/self-review">
	<Card
		icon="thumbsUp"
		title="Самооценка по целям"
		description="Здесь находяится список ваших целей и самооценка по ним. Вывести общий бал, рекомендации"
	/>
</a>

<a href="#/employee/peer-review">
	<Card
		icon="users"
		title="Rewiew коллег"
		description="Здесь находятся задачи по оценке коллег, сейчас их нет. Количество сколько коллег необхолдимо проревьюить"
	/>
</a>

<a href="#/employee/result">
	<Card
		icon="trendingUp"
		title="Результаты"
		description="Здесь находятся пройденные полностью Performance Review с вашим результатом и комментариями. Вывести общий бал, рекомендации"
	/>
</a>

<style>
	:global(.conteiner_title) {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		/*align-items: center;*/
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--text-tertiary);
	}
</style>
