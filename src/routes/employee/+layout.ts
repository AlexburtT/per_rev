import type { LayoutLoad } from "./$types";
import { userStore, loadUserGoals } from "$lib/stores/userStore.svelte";

export const load: LayoutLoad = async () => {
	const user = userStore.currentUser;

	// Защита — если нет пользователя или не сотрудник
	if (!user || user.role !== "employee") {
		throw new Error("Доступ запрещён");
	}

	// Загружаем цели — они нужны и на dashboard, и на /goals
	const goals = await loadUserGoals(user.id);

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
