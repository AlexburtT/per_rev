import type { LayoutLoad } from "./$types";
import { userApi } from "$lib/db";

import { userStore } from "$lib/stores/userStore.svelte";

export const load: LayoutLoad = async () => {
	const userId = userStore.currentUser?.id;
	const user = await userApi.getById(userId);

	if (!user) {
		throw new Error("Пользователь не найден");
	}

	return { user }; // ← возвращаем user
};
