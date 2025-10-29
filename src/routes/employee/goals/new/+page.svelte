<script lang="ts">
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

<svelte:head>
	<title>Новая цель</title>
</svelte:head>

<div class="conteiner_title">
	<h1>Новая цель</h1>
</div>

<Form {fields} submitLabel="+ Добавить цель" />
