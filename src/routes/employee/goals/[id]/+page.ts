// src/routes/employee/goals/[id]/+page.ts
import type { PageLoad } from "./$types";
import * as goalsApi from "$lib/api/goals";
import * as tasksApi from "$lib/api/tasks";

export const load: PageLoad = async ({ params, parent }) => {
	const { user } = await parent(); // ← из /employee/+layout.ts

	const goalId = params.id;
	const goal = await goalsApi.getById(goalId);

	if (!goal || goal.authorId !== user.id) {
		throw new Error("Цель не найдена");
	}

	const tasks = await tasksApi.getByIds(goal.taskIds);

	return {
		goal,
		tasks,
	};
};
