// src/routes/peer-review/+page.ts
import type { PageLoad } from "./$types";
import { userStore } from "$lib/stores/userStore.svelte";
import * as api from "$lib/api";

export const load: PageLoad = async ({ parent }) => {
	await parent(); // гарантирует, что userStore.currentUser загружен

	const reviewerId = userStore.currentUser?.id;
	if (!reviewerId) {
		return { assignments: [] };
	}

	// Получаем все назначения, где текущий пользователь — оценщик
	const assignments = await api.peerAssignment.getByReviewer(reviewerId);

	return { assignments };
};
