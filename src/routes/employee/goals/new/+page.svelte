<script lang="ts">
	import Breadcrumbs from "$lib/components/layouts/Breadcrumbs.svelte";
</script>

<Breadcrumbs
	items={[
		{ title: "Главная", href: "#/employee" },
		{ title: "Цели и задачи", href: "#/employee/goals" },
		{ title: "Новая цель" },
	]}
/>
<h1>Новая цель</h1>
