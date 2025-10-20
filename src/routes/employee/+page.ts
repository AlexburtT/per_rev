import { mockDb } from "$lib/db/mockDb";
import type { PageLoad } from "./$types";

export const load: PageLoad = () => {
	const user = mockDb.getUserById("u1")!;
	const cycle = mockDb.getCurrentCycle();
	const goals = mockDb.getGoals(user.id);
	return { user, cycle, goals };
};
