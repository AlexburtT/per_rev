<script lang="ts">
	import Dialog from "$lib/components/layouts/Dialog.svelte";
	import Form from "$lib/components/ui/Form.svelte";
	import Input from "$lib/components/ui/Input.svelte";
	import { updateField } from "$lib/utils/form";

	interface TaskData {
		title: string;
		description: string;
		result: string;
		dateEnd: string;
	}

	interface Props {
		open: boolean;
		onCreate?: (data: TaskData) => void;
		onClose?: () => void;
	}

	const { open, onCreate, onClose }: Props = $props();

	let formData = $state({
		title: "",
		description: "",
		result: "",
		dateEnd: "",
	});

	function handleFieldChange(name: string, value: string) {
		if (name in formData) {
			formData[name as keyof typeof formData] = value;
		}
	}

	//const resetForm = () => {
	//	formData.title = "";
	//	formData.description = "";
	//	formData.result = "";
	//	formData.dateEnd = "";
	//};

	const handleClose = () => {
		//resetForm();
		onClose?.();
	};

	const handleSubmit = () => {
		if (!formData.title || !formData.dateEnd) return;

		onCreate?.({
			...formData,
		});
		onClose?.();
	};

	$inspect("Отправка", formData);
</script>

<Dialog {open} title="Новая задача" onClose={handleClose}>
	<Form onSubmit={handleSubmit} submitLabel="Добавить задачу">
		<Input
			label="Название"
			name="title"
			type="text"
			required
			value={formData.title}
			onChange={(value: string) => handleFieldChange("title", value)}
		/>
		<Input
			label="Описание"
			name="description"
			type="textarea"
			required
			value={formData.description}
		/>
		<Input
			label="Ожидаемый результат"
			name="result"
			type="textarea"
			value={formData.result}
		/>
		<p class="p-bold">Сроки выполнения:</p>
		<hr />
		<div class="form__input--date">
			<Input
				label="Завершить до"
				name="dateEnd"
				type="date"
				required
				value={formData.dateEnd}
			/>
		</div>
	</Form>
</Dialog>
