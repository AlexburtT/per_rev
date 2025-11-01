// src/routes/employee/goals/[id]/+page.ts
import type { PageLoad } from "./$types";
import * as api from "$lib/api";

export const load: PageLoad = async ({ params, parent }) => {
	const { user } = await parent(); // ← из /employee/+layout.ts

	const goalId = params.id;
	const goal = await api.goals.getById(goalId);

	if (!goal || goal.authorId !== user.id) {
		throw new Error("Цель не найдена");
	}

	const tasks = await api.tasks.getByIds(goal.taskIds);

	return {
		goal,
		tasks,
		user,
	};
};
