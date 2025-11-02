<script lang="ts">
	import Card from "$lib/components/ui/Card.svelte";
	import type { Goal } from "$lib/types/types";

	let { data } = $props<{ goals: Goal[] }>();

	const selfReviewed = data.goals.filter(
		(g: { status: string }) => g.status === "self_reviewed"
	);
	const peerReview = data.goals.filter(
		(g: { status: string }) => g.status === "peer_review"
	);
	const managerReview = data.goals.filter(
		(g: { status: string }) => g.status === "manager_review"
	);
</script>

<svelte:head>
	<title>Цели на оценке</title>
</svelte:head>

<div class="conteiner__title">
	<h1>Цели на оценке</h1>
</div>

{#if selfReviewed.length === 0 && peerReview.length === 0 && managerReview.length === 0}
	<p>Нет целей, ожидающих оценки.</p>
{:else}
	<div class="goals-columns">
		<div class="column">
			<h2>Ожидают самооценки</h2>
			{#if selfReviewed.length === 0}
				<p class="empty-hint">Нет целей</p>
			{:else}
				{#each selfReviewed as goal}
					<a
						href="#/employee/self-review/{goal.id}"
						class="goal-link"
					>
						<Card title={goal.title} layout="vertical">
							<p>Необходимо заполнить анкету самооценки</p>
						</Card>
					</a>
				{/each}
			{/if}
		</div>

		<div class="column">
			<h2>Оценка коллег</h2>
			{#if peerReview.length === 0}
				<p class="empty-hint">Нет целей на Rewiew коллег</p>
			{:else}
				{#each peerReview as goal}
					<Card title={goal.title} layout="vertical">
						<p>Коллеги оценивают вашу цель</p>
					</Card>
				{/each}
			{/if}
		</div>

		<div class="column">
			<h2>Оценка руководителя</h2>
			{#if managerReview.length === 0}
				<p class="empty-hint">Нет целей на Rewiew руководителя</p>
			{:else}
				{#each managerReview as goal}
					<Card title={goal.title} layout="vertical">
						<p>Руководитель оценивает вашу цель</p>
					</Card>
				{/each}
			{/if}
		</div>
	</div>
{/if}

<style>
	.goals-columns {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
		margin-top: 1.5rem;
	}

	.column h2 {
		font-size: 1.25rem;
		margin-bottom: 1rem;
		color: var(--text-secondary);
	}

	.empty-hint {
		color: var(--text-muted);
		font-style: italic;
	}
</style>
