<script lang="ts">
	import Checkbox from "$lib/components/ui/Checkbox.svelte";
	import type { Task } from "$lib/types/types";

	interface Props {
		tasks?: Task[];
		isLoading?: boolean;
		selectedIds?: string[];
		onTaskToggle?: (id: string, checked: boolean) => void;
	}

	const {
		tasks = [],
		isLoading,
		selectedIds,
		onTaskToggle,
	}: Props = $props();
</script>

<div>
	<h3>Список доступных задач</h3>
	<hr />
	{#if isLoading}
		<p>Загрузка...</p>
	{:else if tasks.length === 0}
		<p>Нет доступных задач</p>
		<i>
			*/ Здесь отображается список доступных задач, назначенных
			руководителем
		</i>
	{:else}
		{#each tasks as task}
			<div class="task-item">
				<Checkbox
					label={task.title}
					checked={selectedIds?.includes(task.id)}
					onChange={(checked) => onTaskToggle?.(task.id, checked)}
				/>
				{#if task.description}
					<p class="task-desc">
						{task.description.substring(0, 60)}...
					</p>
				{/if}
			</div>
		{/each}
	{/if}
</div>

<style>
</style>
