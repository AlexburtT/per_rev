import type { GoalData, TaskData } from "$lib/types/forms";
import type { Cycle, Goal, Task, User } from "$lib/types/types";

export const mapTaskFormDataToEntity = (
	taskData: TaskData,
	user: User
): Task => ({
	id: crypto.randomUUID(),
	title: taskData.title,
	description: taskData.description,
	expectedResult: taskData.result,
	assignedTo: user.id,
	department: user.department,
	specialization: user.specialization,
	status: "planned",
	createdAt: new Date().toISOString(),
	deadline: taskData.dateEnd,
});

export const mapGoalFormDataToEntity = (
	goalData: GoalData,
	user: User,
	cycle: Cycle,
	taskIds: string[]
): Goal => ({
	id: crypto.randomUUID(),
	title: goalData.title,
	description: goalData.description,
	expectedResult: goalData.expectedResult,
	deadline: goalData.deadline,
	taskIds: taskIds,
	authorId: user.id,
	cycleId: cycle.id,
	status: "draft",
	createdAt: new Date().toISOString(),
});
