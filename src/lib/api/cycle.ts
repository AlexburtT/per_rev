import { cycleApi } from "$lib/db";
import type { Cycle } from "$lib/types/types";

/**
 * Получить все циклы оценки
 */
export async function getAllCycles(): Promise<Cycle[]> {
	return await cycleApi.getAll();
}

/**
 * Получить активный цикл (status === "active")
 */
export async function getActiveCycle(): Promise<Cycle | undefined> {
	return await cycleApi.getActive();
}

/**
 * Получить цикл по ID
 */
export async function getCycleById(id: string): Promise<Cycle | undefined> {
	return await cycleApi.getById(id);
}

/**
 * Создать или обновить цикл
 */
export async function saveCycle(cycle: Cycle): Promise<void> {
	await cycleApi.put(cycle);
}
