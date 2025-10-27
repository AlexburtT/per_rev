// src/lib/stores/userStore.ts
import * as api from "$lib/api";
import type { User } from "$lib/types/types";

// Создаём ОДИН реактивный объект через $state
export const userStore = $state({
	currentUser: undefined as User | undefined,
	isLoading: false,
	userList: [] as User[],
});

// Загружаем всех пользователей один раз
export async function loadUsersList() {
	if (userStore.userList.length === 0) {
		userStore.userList = await api.users.getAllUsers();
	}
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
}
