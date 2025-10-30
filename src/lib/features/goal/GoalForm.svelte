<!-- src/lib/features/goal/ui/GoalForm.svelte -->
<script lang="ts">
	import Input from "$lib/components/ui/Input.svelte";
	import Button from "$lib/components/ui/Button.svelte";
	import TaskCreatorDialog from "./TaskCreatorDialog.svelte";
	import Form from "$lib/components/ui/Form.svelte";
	import type { Goal, User } from "$lib/types/types";

	interface Props {
		authorId: string;
		user: User;
		cycleId?: string; // опционально — можно передавать из страницы
		initialGoal?: Goal;
		onSuccess?: () => void;
		onTasksChange?: (taskIds: string[]) => void; // ← чтобы TasksList мог обновлять выбор
	}

	const {
		authorId,
		user,
		cycleId = "default-cycle-id", // ← замените на реальный!
		initialGoal,
		onSuccess,
		onTasksChange,
	}: Props = $props();

	const fields = [
		{ name: "title", label: "Название", type: "text", required: true },
		{
			name: "description",
			label: "Описание",
			type: "textarea",
			required: true,
		},
		{ name: "result", label: "Ожидаемый результат", type: "textarea" },
	];

	//const editor = useGoalEditor({
	//	authorId,
	//	cycleId,
	//	user,
	//	initialGoal,
	//	onSuccess,
	//});

	let isDialogOpen = $state(false);
</script>

<Form name="goalForm" submitLabel="Сохранить цель">
	{#each fields as field}
		<Input
			name={field.name}
			label={field.label}
			type={field.type}
			required={field.required}
		/>
	{/each}
	<p class="p-bold">Сроки выполнения:</p>
	<hr />
	<div class="form__input--date">
		<Input name="dateEnd" label="Завершить до" type="date" />
	</div>
	<Button
		type="button"
		title="+ Добавить ключевую задачу"
		variant="outline"
		onClick={() => (isDialogOpen = true)}
	/>
</Form>

<TaskCreatorDialog
	open={isDialogOpen}
	onCreate={(data) => {
		isDialogOpen = false;
	}}
	onClose={() => (isDialogOpen = false)}
/>

<style>
	.form__input--date {
		display: flex;
		gap: 1rem;
	}

	.p-bold {
		font-weight: 500;
	}
</style>
