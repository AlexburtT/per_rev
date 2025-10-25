<script lang="ts">
	import Breadcrumbs from "$lib/components/layouts/Breadcrumbs.svelte";
	import Form from "$lib/components/ui/Form.svelte";
</script>

<Breadcrumbs
	items={[
		{ title: "Главная", href: "#/employee" },
		{ title: "Цели и задачи", href: "#/employee/goals" },
		{ title: "Новая цель" },
	]}
/>
<h1>Новая цель</h1>

<Form />
