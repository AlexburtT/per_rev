// src/routes/employee/self-review/[id]/+page.ts
import type { PageLoad } from "./$types";
import { userStore } from "$lib/stores/userStore.svelte";

export const load: PageLoad = async ({ params, parent }) => {
	await parent();

	const goalId = params.id;
	const goal = userStore.goals.find((g) => g.id === goalId);

	if (!goal) {
		throw new Error("Цель не найдена");
	}

	// Проверяем, что цель в статусе "self_reviewed" — только тогда можно заполнять
	if (goal.status !== "self_reviewed") {
		throw new Error("Эта цель уже прошла самооценку или не готова к ней.");
	}

	return { goal };
};
