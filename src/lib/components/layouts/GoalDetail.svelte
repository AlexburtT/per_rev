<!-- src/lib/components/GoalDetail.svelte -->
<script lang="ts">
	import { goto } from "$app/navigation";
	import TasksList from "$lib/features/goal/TasksList.svelte";
	import type { Goal, Task } from "$lib/types/types";
	import { formatDate } from "$lib/utils/date";
	import { goalStatusLabels } from "$lib/utils/statusLabels";
	import type { Snippet } from "svelte";
	import Button from "../ui/Button.svelte";

	interface Props {
		children: Snippet<[]>;
		goal: Goal;
		canEdit?: boolean;
		onEdit?: () => void;
		onDelete?: () => void;
		onSubmitForWork: () => void;
		onSubmitForSelfReview: () => void;
		allCompleted: boolean;
	}

	let {
		children,
		goal,
		canEdit = false,
		onEdit,
		onDelete,
		onSubmitForWork,
		onSubmitForSelfReview,
		allCompleted = false,
	}: Props = $props();

	const handleEdit = () => onEdit?.();
	const handleDelete = () => onDelete?.();
</script>

<div class="conteiner__title">
	<div class="conteiner__title--header">
		<h2>{goal.title}</h2>
		<p>Срок: {formatDate(goal.createdAt)} - {formatDate(goal.deadline)}</p>
	</div>

	{#if goal.status === "draft" && goal.taskIds.length === 3}
		<Button
			title="Принять в работу"
			variant="primary"
			onClick={onSubmitForWork}
		/>
	{/if}

	{#if goal.status === "submitted" && allCompleted}
		<Button
			title="Отправить на самооценку"
			variant="primary"
			onClick={onSubmitForSelfReview}
		/>
	{/if}
	<div class="goal-status">
		<strong>Статус:</strong>
		<span class="status status--{goal.status}">
			{goalStatusLabels[goal.status]}
		</span>
	</div>

	{#if canEdit}
		<div class="goal__actions">
			<Button iconName="edit" isIconOnly onClick={handleEdit} />
			<Button iconName="trash2" isIconOnly onClick={handleDelete} />
		</div>
	{/if}
</div>

<div class="goal__conteiner">
	<div>
		<div class="goal__description-card">
			<h3>Описание:</h3>
			<p>{goal.description}</p>
		</div>

		<!-- Ожидаемый результат -->
		<div class="goal__expectation-card">
			<h3>Ожидаемый результат:</h3>
			<p>{goal.expectedResult || "Не указан"}</p>
		</div>

		<!-- Задачи -->
		<div class="goal__tasks">
			<h3>Задачи:</h3>
			<div class="goal__tasks--task">
				{@render children()}
			</div>
		</div>
	</div>

	<TasksList />
</div>

<style>
	.goal__description-card,
	.goal__expectation-card {
		padding: 1rem;
	}

	.goal__description-card h3,
	.goal__expectation-card h3 {
		margin-top: 0;
		color: var(--text-primary);
	}

	.goal-status {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem;
	}

	.goal-status .status {
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		font-weight: 500;
	}

	.status--draft {
		background-color: #fff3e0;
		color: var(--warning);
	}

	.status--submitted {
		background-color: #e3f2fd;
		color: var(--primary-medium);
	}

	.status--reviewed {
		background-color: #e8f5e9;
		color: var(--success);
	}

	.goal__actions {
		display: flex;
	}

	.goal__tasks {
		padding: 1rem;

		h3 {
			margin-bottom: 1rem;
		}
	}

	.goal__tasks--task {
		width: 100%;
		border: 1px solid var(--text-tertiary);
		border-radius: 0.3rem;
		padding: 1rem;
		background-color: var(--surface);
		margin-left: 1rem;
	}
</style>
