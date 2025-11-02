// src/lib/api/peerAssignments.ts
import type { PeerAssignment } from "$lib/types/types";
import { peerAssignmentApi } from "$lib/db";
import { userStore } from "$lib/stores/userStore.svelte";
import { getById as getGoalById } from "./goals"; // ← асинхронный метод из API

/**
 * Назначает всех коллег из отдела автора цели как респондентов.
 * Вызывается после отправки самооценки.
 */
export async function createAssignmentsForGoal(
	goalId: string
): Promise<PeerAssignment[]> {
	// 1. Получаем цель из БД (асинхронно)
	const goal = await getGoalById(goalId);
	if (!goal) throw new Error(`Цель не найдена: ${goalId}`);

	// 2. Находим автора цели в списке пользователей
	const author = userStore.userList.find((u) => u.id === goal.authorId);
	if (!author) throw new Error(`Автор цели не найден: ${goal.authorId}`);

	// 3. Находим коллег из того же отдела (кроме автора и HR)
	const peers = userStore.userList.filter(
		(user) =>
			user.id !== author.id &&
			user.department === author.department &&
			user.role !== "hr"
	);

	if (peers.length === 0) {
		console.warn(
			`Нет коллег в отделе "${author.department}" для назначения оценки`
		);
		return [];
	}

	// 4. Создаём назначения
	const now = new Date().toISOString();
	const assignments: PeerAssignment[] = peers.map((peer) => ({
		id: crypto.randomUUID(),
		cycleId: goal.cycleId,
		reviewerId: peer.id, // кто оценивает
		employeeId: author.id, // кого оценивают
		status: "pending",
		assignedAt: now,
	}));

	// 5. Сохраняем все назначения в БД
	await Promise.all(
		assignments.map((assignment) => peerAssignmentApi.put(assignment))
	);

	return assignments;
}

export async function getByReviewer(reviewerId: string) {
	return await peerAssignmentApi.getByReviewer(reviewerId);
}

export async function getById(id: string) {
	return await peerAssignmentApi.getById(id);
}
