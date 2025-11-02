// src/routes/employee/goals/+page.ts
import type { PageLoad } from "./$types";
import * as api from "$lib/api";
import type { Task } from "$lib/types/types";

export const load: PageLoad = async ({ parent }) => {
	const { user } = await parent();
	const goals = await api.goals.getByAuthor(user.id);

	// Загружаем ВСЕ задачи, связанные с целями
	const allTaskIds = goals.flatMap((goal) => goal.taskIds);
	const allTasks = await api.tasks.getByIds(allTaskIds);

	// Создаём маппинг taskId → task
	const taskMap = new Map<string, Task>();
	for (const task of allTasks) {
		taskMap.set(task.id, task);
	}

	// Формируем goalsWithTasks — но НЕ мутируем Goal!
	const goalsWithTasks = goals.map((goal) => ({
		...goal,
		tasks: goal.taskIds.map((id) => taskMap.get(id)!).filter(Boolean),
	}));

	return { goalsWithTasks };
};
