<script lang="ts">
	import Card from "$lib/components/ui/Card.svelte";

	let { data } = $props();
	const { goalsWithTasks: goals } = data;
</script>

<svelte:head>
	<title>Мои цели</title>
</svelte:head>

<div class="conteiner_title">
	<h1>Мои цели</h1>
</div>

{#if goals.length === 0}
	<p>У вас пока нет целей.</p>
{:else}
	<div class="goals-grid">
		{#each goals as goal}
			<a href="/employee/goals/{goal.id}" class="goal-link">
				<Card
					title={goal.title}
					layout="vertical"
					description={`Срок: до ${goal.deadline}`}
				>
					<h3>Задачи ({goal.taskIds.length})</h3>
					<ul>
						{#each goal.tasks as task}
							<li>{task.title}</li>
						{/each}
					</ul>
				</Card>
			</a>
		{/each}
	</div>
{/if}

<a href="/employee/goals/new" class="btn primary">+ Новая цель</a>

<style>
	.goals-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.25rem;
		align-items: stretch; /* ← все ячейки растягиваются по высоте */
	}

	.goal-link {
		display: block;
		height: 100%; /* ← ссылка занимает всю высоту ячейки */
		text-decoration: none;
		color: inherit;
	}

	/* Убедимся, что Card тоже растягивается */
	.goal-link :global(.card) {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	/* Контент внутри карточки должен заполнять пространство */
	.goal-link :global(.card__content) {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	/* Описание и children не должны сжиматься */
	.goal-link :global(.card__description) {
		flex-shrink: 0;
	}

	.goal-link :global(.card h3) {
		margin-top: auto;
		margin-bottom: 0.5rem;
		flex-shrink: 0;
	}

	.goal-link :global(.card ul) {
		margin: 0;
		padding-left: 1.25rem;
		flex-shrink: 0;
	}
</style>
