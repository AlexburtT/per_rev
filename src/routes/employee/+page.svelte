<script lang="ts">
	import Card from "$lib/components/ui/Card.svelte";
	import { userStore } from "$lib/stores/userStore.svelte.js";

	let { data } = $props();
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<div class="conteiner__title">
	<h1>Dashboard</h1>
</div>

<a href="#/employee/goals">
	<Card
		icon="target"
		title="Цели и задачи"
		description={`Всего целей: ${userStore.goals.length}`}
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
