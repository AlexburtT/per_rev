// src/lib/api/tasks.ts
import { taskApi } from "$lib/db";
import type { Task } from "$lib/types/types";

export async function getTasksForUser(userId: string) {
	return await taskApi.getByAssignedTo(userId);
}

export async function getTasksForDepartment(department: string) {
	return await taskApi.getByDepartment(department);
}

export async function createTask(task: Omit<Task, "id">) {
	const id = `task-${Date.now()}`;
	await taskApi.put({ ...task, id, createdAt: new Date().toISOString() });
	return id;
}

export async function getById(taskId: string): Promise<Task | undefined> {
	return await taskApi.getById(taskId);
}

export async function getByIds(taskIds: string[]): Promise<Task[]> {
	return await taskApi.getByIds(taskIds);
}
