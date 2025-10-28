// src/routes/employee/goals/+page.ts
import type { PageLoad } from "./$types";
import * as tasksApi from "$lib/api/tasks";

export const load: PageLoad = async ({ parent }) => {
	// Получаем данные из /employee/+layout.ts
	const layoutData = await parent();

	// Загружаем задачи для каждой цели
	const goalsWithTasks = await Promise.all(
		layoutData.goals.map(async (goal) => {
			const tasks = await tasksApi.getByIds(goal.taskIds);
			return { ...goal, tasks };
		})
	);

	return {
		goalsWithTasks,
		breadcrumbTitle: "Цели",
	};
};
