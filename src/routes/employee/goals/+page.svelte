<script lang="ts">
	import Breadcrumbs from "$lib/components/layouts/Breadcrumbs.svelte";

	// Пример данных (в реальности — из API или store)
	const goals = [
		{ id: "1", title: "Повысить эффективность команды" },
		{ id: "2", title: "Пройти курс по управлению" },
	];
</script>

<Breadcrumbs
	items={[
		{ title: "Главная", href: "/#/employee" },
		{ title: "Цели и задачи" },
	]}
/>

<h1>Мои цели</h1>
<ul>
	{#each goals as goal}
		<li>
			<a href="#/employee/goals/{goal.id}">{goal.title}</a>
		</li>
	{/each}
</ul>

<a href="#/employee/goals/new">+ Новая цель</a>
