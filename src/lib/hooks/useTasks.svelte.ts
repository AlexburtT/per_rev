// src/lib/hooks/useTasks.ts

import { taskApi } from "$lib/db";
import type { Task } from "$lib/types/types";

export function useTasks(department: string, userId?: string) {
	let tasks = $state<Task[]>([]);
	let loading = $state(true);

	$effect(() => {
		loading = true;
		if (userId) {
			// Задачи конкретного сотрудника
			taskApi.getByAssignedTo(userId).then((t) => {
				tasks = t;
				loading = false;
			});
		} else {
			// Все задачи отдела
			taskApi.getByDepartment(department).then((t) => {
				tasks = t;
				loading = false;
			});
		}
	});

	return { tasks, loading };
}
