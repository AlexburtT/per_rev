<script lang="ts">
	import Card from "$lib/components/ui/Card.svelte";
	import { userStore } from "$lib/stores/userStore.svelte.js";

	let { data } = $props();

	// Фильтруем цели
	const activeGoals = $derived(
		userStore.goals.filter(
			(g) => g.status === "draft" || g.status === "submitted"
		)
	);

	const selfReviewGoals = $derived(
		userStore.goals.filter((g) => g.status === "self_reviewed")
	);

	const pendingPeerReviews = $derived(
		userStore.peerAssignments.filter((a) => a.status === "pending")
	);
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
		description={`Активных целей: ${activeGoals.length}`}
	></Card>
</a>

<a href="#/employee/self-review">
	<Card
		icon="thumbsUp"
		title="Самооценка по целям"
		description={`Готовы к оценке: ${selfReviewGoals.length}`}
	/>
</a>

<a href="#/employee/peer-review">
	<Card
		icon="users"
		title="Rewiew коллег"
		description={`Назначено: ${pendingPeerReviews.length} коллег для их оценки`}
	/>
</a>

<a href="#/employee/result">
	<Card
		icon="trendingUp"
		title="Результаты"
		description="Здесь находятся пройденные полностью Performance Review с вашим результатом и комментариями. Вывести общий бал, рекомендации"
	/>
</a>
