// src/routes/employee/self-review/+page.ts
import type { PageLoad } from "./$types";
import { userStore } from "$lib/stores/userStore.svelte";

export const load: PageLoad = async ({ parent }) => {
	await parent(); // гарантирует, что userStore.goals уже загружен

	// Берём цели из стора, а не из API!
	const goals = userStore.goals.filter((g) =>
		["self_reviewed", "peer_review", "manager_review"].includes(g.status)
	);

	return { goals };
};
