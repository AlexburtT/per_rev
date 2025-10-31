// $lib/stores/userStore.svelte
import * as api from "$lib/api";
import type { User, Goal } from "$lib/types/types";

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
	const goals = await api.goals.getByAuthor(userId);
	userStore.goals = goals;
	return goals;
}
