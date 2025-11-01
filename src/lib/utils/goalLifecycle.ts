import type { Goal, GoalStatus } from "$lib/types/types";
import * as api from "$lib/api";

/**
 * Автоматически переводит цели из 'draft' в 'submitted',
 * если прошло >= 7 дней с момента создания.
 * Вызывать при входе на страницу целей или по расписанию (например, при открытии приложения).
 */
export async function autoSubmitDraftGoals(goals: Goal[]): Promise<Goal[]> {
	const now = new Date();
	const updatedGoals: Goal[] = [];

	for (const goal of goals) {
		if (goal.status !== "draft") continue;

		const createdAt = new Date(goal.createdAt);
		const diffTime = Math.abs(now.getTime() - createdAt.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		if (diffDays >= 7) {
			// Автоматически переводим в "submitted"
			const updatedGoal = { ...goal, status: "submitted" as GoalStatus };
			await api.goals.saveGoal(updatedGoal);
			updatedGoals.push(updatedGoal);
		}
	}

	return updatedGoals; // возвращает только обновлённые цели (для опционального обновления UI)
}
