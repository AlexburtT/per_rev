<!-- src/lib/features/goal/ui/GoalForm.svelte -->
<script lang="ts">
	import Input from "$lib/components/ui/Input.svelte";
	import Button from "$lib/components/ui/Button.svelte";
	import TaskCreatorDialog from "./TaskCreatorDialog.svelte";
	import Form from "$lib/components/ui/Form.svelte";
	import type { Task, User } from "$lib/types/types";
	import { getFormData, resetForm } from "$lib/utils/form";
	import type { TaskData, GoalData } from "$lib/types/forms";
	import { formatDate } from "$lib/utils/date";

	interface Props {
		authorId: string;
		user: User;
		tasks?: Task[];
		onSuccess?: (data: GoalData) => void;
		onTaskCreate?: (data: TaskData) => void;
	}

	const {
		authorId,
		user,
		tasks = [],
		onSuccess,
		onTaskCreate,
	}: Props = $props();

	let isDialogOpen = $state(false);

	const handleSubmit = (event: Event) => {
		const data = getFormData<GoalData>(event);
		if (!data) return;

		onSuccess?.(data);
		resetForm(event);
	};

	const handleTaskCreate = (formData: TaskData) => {
		onTaskCreate?.(formData);
		isDialogOpen = false;
	};

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
</script>

<Form name="goalForm" submitLabel="Сохранить цель" onSubmit={handleSubmit}>
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

	<!-- Отображение уже добавленных задач -->
	{#if tasks.length > 0}
		<div class="goal-form__tasks-preview">
			<h4>Ключевые задачи ({tasks.length}/3)</h4>
			<ul>
				{#each tasks as task}
					<li class="task-item">
						<strong>{task.title}</strong>
						<span class="task-deadline"
							>до {formatDate(task.deadline)}</span
						>
					</li>
				{/each}
			</ul>
		</div>
	{/if}

	{#if tasks.length < 3}
		<Button
			type="button"
			title="+ Добавить ключевую задачу"
			variant="outline"
			onClick={() => (isDialogOpen = true)}
		/>
	{/if}
</Form>

<TaskCreatorDialog
	open={isDialogOpen}
	onCreate={handleTaskCreate}
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

	.goal-form__tasks-preview {
		margin-top: 1rem;
		padding: 0.75rem;
		background: #f9f9f9;
		border-radius: 6px;
	}

	.goal-form__tasks-preview h4 {
		margin-top: 0;
		font-size: 0.9rem;
		color: #555;
	}

	.task-item {
		display: flex;
		justify-content: space-between;
		font-size: 0.875rem;
		margin-bottom: 0.25rem;
	}

	.task-deadline {
		color: #666;
	}
</style>
