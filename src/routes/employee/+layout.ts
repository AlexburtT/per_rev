import type { LayoutLoad } from "./$types";
import {
	loadUserGoals,
	userStore,
	loadUsersList,
	loadPeerAssignments,
} from "$lib/stores/userStore.svelte";
import * as api from "$lib/api";

export const load: LayoutLoad = async () => {
	const user = userStore.currentUser;

	// Защита — если нет пользователя или не сотрудник
	if (!user || user.role !== "employee") {
		throw new Error("Доступ запрещён");
	}

	// Загружаем всех пользователей (нужны для поиска руководителя и коллег)
	await loadUsersList();

	// Загружаем цели сотрудника
	const goals = await loadUserGoals(user.id);
	await loadPeerAssignments(user.id); // ← загружаем назначения

	// Находим ФИО руководителя
	const manager = user.managerId
		? userStore.userList.find((u) => u.id === user.managerId)
		: null;

	return {
		user,
		managerName: manager?.fullName,
		goals,
	};
};
