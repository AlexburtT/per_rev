import type { LayoutLoad } from "./$types";
import { userApi, goalApi } from "$lib/db";
import type { User } from "$lib/types/types";

export const load: LayoutLoad = async ({ parent }) => {
	const { user } = await parent();

	// Защита — только для сотрудников
	if (user.role !== "employee") {
		throw new Error("Доступ запрещён");
	}

	// Загружаем цели напрямую
	const goals = await goalApi.getByAuthor(user.id);

	// Загружаем руководителя
	let managerName: string | null = null;
	if (user.managerId) {
		const manager = await userApi.getById(user.managerId);
		managerName = manager?.fullName || null;
	}

	return {
		user,
		managerName,
		goals,
	};
};
