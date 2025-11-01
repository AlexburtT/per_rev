<!-- src/lib/components/GoalTasks.svelte -->
<script lang="ts">
	import type { Task } from "$lib/types/types";
	import { taskStatusLabels } from "$lib/utils/statusLabels";
	import { formatDate } from "$lib/utils/date";
	import Button from "../ui/Button.svelte";
	import TaskCreatorDialog from "$lib/features/goal/TaskCreatorDialog.svelte";
	import type { TaskData } from "$lib/types/forms";

	interface Props {
		tasks?: Task[];
		canAddTask?: boolean;
		onTaskCreate?: (data: TaskData) => void;
		onTaskComplete?: (taskId: string) => void;
	}

	const {
		tasks = [],
		canAddTask = false,
		onTaskCreate,
		onTaskComplete,
	}: Props = $props();

	let isDialogOpen = $state(false);

	const handleTaskCreate = (taskData: TaskData) => {
		onTaskCreate?.(taskData);
		isDialogOpen = false;
	};
</script>

{#if tasks.length === 0}
	<p class="no-tasks">Нет задач</p>
{:else}
	{#each tasks as task, i}
		<div class="task-card" class:task-card--last={i === tasks.length - 1}>
			<h4>{i + 1}. {task.title}</h4>
			<p>
				Сроки - {formatDate(task.createdAt)} - {formatDate(
					task.deadline
				)}
			</p>

			<div class="task-expectation">
				<strong>Описание:</strong>
				<p class="task-description">{task.description}</p>
			</div>

			<div class="task-expectation">
				<strong>Ожидаемый результат:</strong>
				<p>{task.expectedResult}</p>
			</div>

			<div class="task-footer">
				<span class="task-status">
					<p>
						<strong>Статус:</strong>
						{taskStatusLabels[task.status]}
					</p>
				</span>
				{#if task.completedAt}
					<span class="task-completed-date">
						<small>Завершено: {formatDate(task.completedAt)}</small>
					</span>
				{/if}
			</div>
			{#if task.status !== "completed"}
				<Button
					title="Завершить задачу"
					iconName="done"
					iconPosition="right"
					variant="primary"
					onClick={() => {
						() => onTaskComplete?.(task.id);
					}}
				/>
			{/if}
		</div>
	{/each}
	{#if canAddTask && tasks.length < 3}
		<Button
			title="Добавить ключевую задачу"
			variant="secondary"
			onClick={() => (isDialogOpen = true)}
		/>
	{/if}
{/if}

<TaskCreatorDialog
	open={isDialogOpen}
	onCreate={handleTaskCreate}
	onClose={() => (isDialogOpen = false)}
/>

<style>
	.no-tasks {
		color: var(--text-secondary);
		font-style: italic;
	}

	.task-card {
		padding: 1rem;
		margin-bottom: 1rem;
		border-bottom: 1px solid var(--text-tertiary);
	}

	.task-card--last {
		border-bottom: none;
		margin-bottom: 0;
	}

	.task-card h4 {
		font-size: 1.1rem;
		color: var(--text-primary);
	}

	.task-expectation {
		padding: 1rem;
	}

	.task-footer {
		padding-left: 1rem;
		color: var(--warning);
	}

	.task-completed-date {
		font-size: 0.875rem;
		color: var(--success);
	}
</style>
