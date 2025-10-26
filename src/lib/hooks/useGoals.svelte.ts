// src/lib/hooks/useGoals.ts

import { goalApi } from "$lib/db";
import type { Goal } from "$lib/types/types";

export function useGoals(authorId: string) {
	let goals = $state<Goal[]>([]);
	let loading = $state(true);

	$effect(() => {
		loading = true;
		goalApi.getByAuthor(authorId).then((g) => {
			goals = g;
			loading = false;
		});
	});

	return { goals, loading };
}
