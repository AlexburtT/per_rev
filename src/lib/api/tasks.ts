// src/lib/api/tasks.ts
import { taskApi } from "$lib/db";
import type { Task, TaskStatus } from "$lib/types/types";

export async function getTasksForUser(userId: string) {
	return await taskApi.getByAssignedTo(userId);
}

export async function getTasksForDepartment(department: string) {
	return await taskApi.getByDepartment(department);
}

export async function getById(taskId: string): Promise<Task | undefined> {
	return await taskApi.getById(taskId);
}

export async function createTask(task: Task): Promise<string> {
	await taskApi.put(task);
	return task.id; // id уже есть
}

export async function getByIds(taskIds: string[]): Promise<Task[]> {
	return await taskApi.getByIds(taskIds);
}

export async function updateTaskStatus(
	taskId: string,
	status: TaskStatus
): Promise<void> {
	const task = await taskApi.getById(taskId);
	if (!task) throw new Error("Task not found");

	await taskApi.put({
		...task,
		status,
		...(status === "completed"
			? { completedAt: new Date().toISOString() }
			: {}),
	});
}

export async function removeTask(taskId: string): Promise<void> {
	await taskApi.delete(taskId);
}
