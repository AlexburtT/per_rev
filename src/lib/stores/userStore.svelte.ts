// src/lib/stores/userStore.ts
import * as api from "$lib/api";
import type { User, Goal } from "$lib/types/types";

// Создаём ОДИН реактивный объект через $state
export const userStore = $state({
	currentUser: undefined as User | undefined,
	isLoading: false,
	userList: [] as User[],
	goals: [] as Goal[],
});

// Загружаем всех пользователей один раз
export async function loadUsersList() {
	if (userStore.userList.length === 0) {
		userStore.userList = await api.users.getAllUsers();
	}
}

// Загружаем цели сотрудника (обычно вызывается в /employee/+layout.ts)
export async function loadUserGoals(userId: string) {
	const goals = await api.goals.getByAuthor(userId);
	userStore.goals = goals;
	return goals;
}

// Функция для загрузки конкретного пользователя
export async function loadUser(userId: string) {
	userStore.isLoading = true;
	try {
		userStore.currentUser = await api.users.getUserById(userId);
	} finally {
		userStore.isLoading = false;
	}
}

// Функция для сброса
export function clearUser() {
	userStore.currentUser = undefined;
	userStore.goals = [];
}
