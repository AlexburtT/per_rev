<script lang="ts">
	import Breadcrumbs from "$lib/components/layouts/Breadcrumbs.svelte";
	import Card from "$lib/components/ui/Card.svelte";

	// Пример данных (в реальности — из API или store)
	const goals = [
		{
			id: "1",
			title: "Повысить эффективность команды",
			tasks: [{ title: "Ввести систему учета" }],
		},
		{
			id: "2",
			title: "Пройти курс по управлению",
			tasks: [
				{ title: "Ввести систему учета" },
				{ title: "Задание 2" },
				{ title: "Задание 3" },
			],
		},
	];
</script>

<Breadcrumbs
	items={[
		{ title: "Главная", href: "#/employee" },
		{ title: "Цели и задачи" },
	]}
/>

<div class="conteiner_title">
	<h1>Мои цели</h1>
</div>

<div class="goals-grid">
	{#each goals as goal}
		<a href="#/employee/goals/{goal.id}" class="goal-link">
			<Card
				title={goal.title}
				layout="vertical"
				description="Сроки выполнения с 15.10.2025 - 02.11.2025"
			>
				<h3>Задачи</h3>
				<ul>
					<li>Задача 1</li>
					<li>Задача 2</li>
					<li>Задача 3</li>
				</ul>
			</Card>
		</a>
	{/each}
</div>

<a href="#/employee/goals/new" class="btn primary">+ Новая цель</a>

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
