// src/lib/hooks/useCurrentUser.ts

import { userApi } from "$lib/db";
import type { User } from "$lib/types/types";

// В реальном приложении — из auth, localStorage или параметра
// Здесь — жёстко зададим для демо
const MOCK_CURRENT_USER_ID = "emp1"; // ← можно менять на "mgr1" для теста роли менеджера

export function useCurrentUser() {
	let user = $state(<User | undefined>undefined);
	let loading = $state(true);

	$effect(() => {
		loading = true;
		userApi.getById(MOCK_CURRENT_USER_ID).then((u) => {
			user = u;
			loading = false;
		});
	});

	return { user, loading };
}
