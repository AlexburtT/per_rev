// src/lib/api/goals.ts
import { goalApi } from "$lib/db";
import type { Goal } from "$lib/types/types";

/**
 * Получить все цели автора (сотрудника)
 */
export async function getByAuthor(authorId: string): Promise<Goal[]> {
	return await goalApi.getByAuthor(authorId);
}

/**
 * Получить цель по ID
 */
export async function getById(goalId: string): Promise<Goal | undefined> {
	return await goalApi.getById(goalId);
}

/**
 * Получить цели по циклу оценки
 */
export async function getByCycle(cycleId: string): Promise<Goal[]> {
	return await goalApi.getByCycle(cycleId);
}

/**
 * Создать или обновить цель
 */
export async function save(goal: Goal): Promise<void> {
	await goalApi.put(goal);
}

/**
 * Удалить цель по ID
 */
export async function remove(goalId: string): Promise<void> {
	await goalApi.delete(goalId);
}
