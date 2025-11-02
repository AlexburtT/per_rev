<!-- src/lib/features/self-review/ui/SelfReviewForm.svelte -->
<script lang="ts">
	import Input from "$lib/components/ui/Input.svelte";
	import Form from "$lib/components/ui/Form.svelte";
	import type { SelfReviewData } from "$lib/types/forms";
	import ScoreSelector from "$lib/components/ui/ScoreSelector.svelte";
	import { getFormData, resetForm } from "$lib/utils/form";

	interface Props {
		onSuccess?: (data: SelfReviewData) => void;
	}
	const { onSuccess }: Props = $props();

	const handleSubmit = (event: Event) => {
		const raw = getFormData(event);
		if (!raw) return;

		const selfReviewData = {
			resultDescription: raw.resultDescription,
			personalContribution: raw.personalContribution,
			learnings: raw.learnings,
			improvements: raw.improvements,
			collaborationScore: Number(raw.collaborationScore),
			satisfactionScore: Number(raw.satisfactionScore),
		};

		console.log(selfReviewData);

		onSuccess?.(selfReviewData);
		resetForm(event);
	};

	const fields = [
		{
			name: "resultDescription",
			label: "1. Каких результатов удалось достичь?",
			type: "textarea",
			placeholder: "Опиши результат по задаче, используя шаблон...",
			required: true,
		},

		{
			name: "personalContribution",
			label: "2. Какой личный вклад ты сделал в полученный результат?",
			type: "textarea",
			placeholder:
				"Опиши личный вклад и влияние на общий результат (с метриками)",
			required: true,
		},

		{
			name: "learnings",
			label: "3. Что ты забираешь с собой по результатам выполнения этой задачи?",
			type: "textarea",
			placeholder: "Свободный ответ",
			required: true,
		},

		{
			name: "improvements",
			label: "4. Что в следующий раз будешь делать по-другому?",
			type: "textarea",
			placeholder: "Свободный ответ",
			required: true,
		},
	];
</script>

<Form
	name="selfReviewForm"
	onSubmit={handleSubmit}
	submitLabel="Сохранить и отправить"
>
	{#each fields as field}
		<Input
			name={field.name}
			label={field.label}
			type={field.type}
			placeholder={field.placeholder}
			required={field.required}
		/>
	{/each}

	<!-- Оценки -->
	<ScoreSelector
		name="collaborationScore"
		label="5. Как ты оцениваешь качество своего взаимодействия с коллегами, командой по данной задаче?"
		required
		value
	/>

	<ScoreSelector
		name="satisfactionScore"
		label="6. Как ты оцениваешь общую удовлетворённость своим выполнением данной задачи?"
		required
		value
	/>
</Form>

<style>
</style>
