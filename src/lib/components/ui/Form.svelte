<script lang="ts">
	import Dialog from "../layouts/Dialog.svelte";
	import Button from "./Button.svelte";
	import Input from "./Input.svelte";

	let isModalOpen = $state(false);
</script>

<form class="form-field">
	<Input name="title" label="Название" placeholder="Введите название цели" />
	<Input
		name="description"
		label="Описание"
		placeholder="Введите описание цели"
		type="textarea"
	/>
	<Input
		name="result"
		label="Ожидаемый результат"
		placeholder="Введите описание ожидаемого результата"
		type="textarea"
	/>
	<Input name="dateStart" label="Начало реализации" type="date" />
	<Input name="dateEnd" label="Начало реализации" type="date" />

	<Button
		title="+ Добавить ключевую задачу"
		variant="secondary"
		onClick={() => (isModalOpen = true)}
	/>
</form>

<Dialog
	open={isModalOpen}
	title="Добавить цель"
	onClose={() => (isModalOpen = false)}
>
	<h1>Im Dialog</h1>
</Dialog>

<style>
	.form-field {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
