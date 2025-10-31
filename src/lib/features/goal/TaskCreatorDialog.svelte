<script lang="ts">
	import Dialog from "$lib/components/layouts/Dialog.svelte";
	import Form from "$lib/components/ui/Form.svelte";
	import Input from "$lib/components/ui/Input.svelte";
	import { getFormData, resetForm } from "$lib/utils/form";
	import type { TaskData } from "$lib/types/forms";

	interface Props {
		open: boolean;
		onCreate?: (data: TaskData) => void;
		onClose?: () => void;
	}

	const { open, onCreate, onClose }: Props = $props();

	const handleSubmit = (event: Event) => {
		const data = getFormData<TaskData>(event);

		onCreate?.(data!);
		resetForm(event);
		onClose?.();
	};

	const handleClose = () => onClose?.();
</script>

<Dialog {open} title="Новая задача" onClose={handleClose}>
	<Form name="taskForm" onSubmit={handleSubmit} submitLabel="Добавить задачу">
		<Input label="Название" name="title" type="text" required />
		<Input label="Описание" name="description" type="textarea" required />
		<Input label="Ожидаемый результат" name="result" type="textarea" />
		<p class="p-bold">Сроки выполнения:</p>
		<hr />
		<div class="form__input--date">
			<Input label="Завершить до" name="dateEnd" type="date" required />
		</div>
	</Form>
</Dialog>
