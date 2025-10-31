// src/routes/employee/goals/+page.ts
import type { PageLoad } from "./$types";
import { goalApi, taskApi } from "$lib/db";
import type { Task } from "$lib/types/types";

export const load: PageLoad = async ({ parent }) => {
	const { user } = await parent();
	const goals = await goalApi.getByAuthor(user.id);

	// Загружаем ВСЕ задачи, связанные с целями
	const allTaskIds = goals.flatMap((goal) => goal.taskIds);
	const allTasks = await taskApi.getByIds(allTaskIds);

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
