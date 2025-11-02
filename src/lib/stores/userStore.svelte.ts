// $lib/stores/userStore.svelte
import * as api from "$lib/api";
import type { User, Goal } from "$lib/types/types";
import { autoSubmitDraftGoals } from "$lib/utils/goalLifecycle";

export const userStore = $state({
	currentUser: undefined as User | undefined,
	isLoading: false,
	userList: [] as User[],
	goals: [] as Goal[],
});

// --- Пользователи ---
export async function loadUsersList() {
	if (userStore.userList.length === 0) {
		userStore.userList = await api.users.getAllUsers();
	}
}

export async function loadUser(userId: string) {
	userStore.isLoading = true;
	try {
		userStore.currentUser = await api.users.getUserById(userId);
	} finally {
		userStore.isLoading = false;
	}
}

export function clearUser() {
	userStore.currentUser = undefined;
	userStore.goals = [];
}

// --- Цели ---
export async function loadUserGoals(userId: string) {
	let goals = await api.goals.getByAuthor(userId);

	// Автоматически переводим старые черновики в "submitted"
	const updatedGoals = await autoSubmitDraftGoals(goals);

	// Если были обновления — синхронизируем с API и локальным списком
	if (updatedGoals.length > 0) {
		// Обновляем исходный массив: заменяем старые цели на новые
		const updatedMap = new Map(updatedGoals.map((g) => [g.id, g]));
		goals = goals.map((g) => updatedMap.get(g.id) ?? g);

		// Опционально: обновить каждую цель в API уже сделано внутри autoSubmitDraftGoals
	}

	userStore.goals = goals;
	return goals;
}

// --- CRUD для целей (уже обсуждали) ---
export async function createGoal(goalData: Partial<Goal>) {
	const newGoal = await api.goals.saveGoal(goalData as Goal);
	userStore.goals = [...userStore.goals, newGoal] as Goal[];
	return newGoal;
}

export async function updateGoal(updatedGoal: Goal) {
	await api.goals.saveGoal(updatedGoal); // возвращает void
	userStore.goals = userStore.goals.map((g) =>
		g.id === updatedGoal.id ? updatedGoal : g
	);
	return updatedGoal;
}

export async function deleteGoal(goalId: string) {
	await api.goals.removeGoal(goalId);
	userStore.goals = userStore.goals.filter((g) => g.id !== goalId);
}

export async function cancelGoal(goalId: string) {
	const goal = userStore.goals.find((g) => g.id === goalId);
	if (!goal) return;
	const cancelledGoal = { ...goal, status: "cancelled" as const };
	await updateGoal(cancelledGoal);
}
