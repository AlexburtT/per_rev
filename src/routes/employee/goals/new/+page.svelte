<script lang="ts">
	import Breadcrumbs from "$lib/components/layouts/Breadcrumbs.svelte";
	import type { Field } from "$lib/components/ui/Form.svelte";
	import Form from "$lib/components/ui/Form.svelte";

	const fields: Field[] = [
		{ name: "title", label: "Название", type: "text", required: true },
		{
			name: "description",
			label: "Описание",
			type: "textarea",
			required: true,
		},
		{ name: "result", label: "Ожидаемый результат", type: "textarea" },
		{ name: "dateStart", label: "Начало реализации", type: "date" },
		{ name: "dateEnd", label: "Окончание реализации", type: "date" },
	];
</script>

<Breadcrumbs
	items={[
		{ title: "Главная", href: "#/employee" },
		{ title: "Цели и задачи", href: "#/employee/goals" },
		{ title: "Новая цель" },
	]}
/>
<h1>Новая цель</h1>

<Form {fields} submitLabel="+ Добавить цель" />
