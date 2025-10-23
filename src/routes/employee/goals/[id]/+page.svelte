<script lang="ts">
	import Breadcrumbs from "$lib/components/layouts/Breadcrumbs.svelte";

	// Пример данных (в реальности — из API или store)
	const goal = { id: "1", title: "Повысить эффективность команды" };
</script>

<Breadcrumbs
	items={[
		{ title: "Главная", href: "/#/employee" },
		{ title: "Цели и задачи", href: "/#/employee/goals" },
		{ title: goal.title },
	]}
/>

<h1>Цель такая-то</h1>
