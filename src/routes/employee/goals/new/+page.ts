import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { cycleApi } from "$lib/db";

export const load: PageLoad = async ({ parent }) => {
	const { user } = await parent();

	// Получаем активный цикл
	const activeCycle = await cycleApi.getActive(); // ← возвращает только "active"

	if (!activeCycle) {
		throw error(
			400,
			"Нет активного оценочного цикла. Создание целей недоступно."
		);
	}

	return {
		user,
		activeCycle,
	};
};
