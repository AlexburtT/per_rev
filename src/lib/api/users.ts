// src/lib/api/users.ts
import { userApi } from "$lib/db"; // ← зависит от IndexedDB, но скрыт от компонентов

export async function getCurrentUser() {
	// В будущем: заменишь на fetch('/api/me')
	return await userApi.getById("emp1");
}

export async function getUserById(id: string) {
	return await userApi.getById(id);
}

export async function getAllUsers() {
	return await userApi.getAll();
}
