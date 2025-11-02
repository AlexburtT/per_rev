// src/routes/peer-review/[id]/+page.ts
import type { PageLoad } from "./$types";
import { userStore } from "$lib/stores/userStore.svelte";
import * as api from "$lib/api";
import type { PeerAssignment, User, Goal } from "$lib/types/types";

export const load: PageLoad = async ({ params, parent }) => {
	await parent();

	const assignmentId = params.id;

	// Получаем назначение
	const assignment = await api.peerAssignment.getById(assignmentId);
	if (!assignment) {
		throw new Error("Назначение не найдено");
	}

	// Получаем данные оцениваемого сотрудника
	const employee = userStore.userList.find(
		(u) => u.id === assignment.employeeId
	);
	if (!employee) {
		throw new Error("Сотрудник не найден");
	}

	// Получаем цели сотрудника в этом цикле (чтобы выбрать задачу для оценки)
	const goals = await api.goals.getByCycle(assignment.cycleId);
	const employeeGoals = goals.filter(
		(g) => g.authorId === assignment.employeeId
	);

	// Берём первую цель (в MVP — одна цель = одна задача)
	const goal = employeeGoals[0];

	return {
		assignment,
		employee,
		goal,
	};
};
