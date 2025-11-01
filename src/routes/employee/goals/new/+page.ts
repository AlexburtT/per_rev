import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import * as api from "$lib/api";

export const load: PageLoad = async ({ parent }) => {
	const { user } = await parent();

	// Получаем активный цикл
	const activeCycle = await api.cycles.getActiveCycle(); // ← возвращает только "active"

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
