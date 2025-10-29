<script lang="ts">
	import Button from "$lib/components/ui/Button.svelte";
	import Form from "$lib/components/ui/Form.svelte";
	import Input from "$lib/components/ui/Input.svelte";
	import Dialog from "$lib/components/layouts/Dialog.svelte";
	const fields = [
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

	const fieldFormDialog = [
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

	// Инициализируем formData с пустыми значениями
	let formData = $state(Object.fromEntries(fields.map((f) => [f.name, ""])));

	const handleSubmit = async () => {
		const goal = {
			id: crypto.randomUUID(),
			...formData,
			createdAt: new Date().toISOString(),
		};
		console.log("📥 Сохраняем:", goal);
		// await saveGoal(goal);
	};

	const handleSubmitForDialogForm = async () => {
		const task = {
			id: crypto.randomUUID(),
			...formData,
			createdAt: new Date().toISOString(),
		};
		console.log("📥 Сохраняем:", task);
		isDialogOpen = false;
		// await saveGoal(goal);
	};

	let isDialogOpen = $state(false);

	function openDialog() {
		isDialogOpen = true;
	}

	function closeDialog() {
		isDialogOpen = false;
	}
</script>

<svelte:head>
	<title>Новая цель</title>
</svelte:head>

<div class="conteiner_title">
	<h1>Новая цель</h1>
</div>

<Form onSubmit={handleSubmit} submitLabel="Сохранить цель">
	{#each fields as field}
		<Input
			name={field.name}
			label={field.label}
			type={field.type}
			required={field.required}
			bind:value={formData[field.name]}
		/>
	{/each}
	<Button
		title="+ Добавить ключевую задачу"
		variant="outline"
		onClick={openDialog}
	/>
</Form>

<Dialog open={isDialogOpen} title="Новая задача" onClose={closeDialog}>
	<Form onSubmit={handleSubmitForDialogForm} submitLabel="Сохранить задачу">
		{#each fieldFormDialog as field}
			<Input
				name={field.name}
				label={field.label}
				type={field.type}
				required={field.required}
				bind:value={formData[field.name]}
			/>
		{/each}
	</Form>
</Dialog>
