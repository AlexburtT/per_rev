// src/lib/db/mockData.ts

import { userApi, cycleApi, taskApi, goalApi, peerAssignmentApi } from ".";
import type { User, Cycle, Task, Goal, PeerAssignment } from "../types";

// === Вспомогательные утилиты ===

function randomDate(start: Date, end: Date): string {
	return new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime())
	).toISOString();
}

function randomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomElement<T>(arr: T[]): T {
	return arr[Math.floor(Math.random() * arr.length)];
}

const TASK_TITLES = [
	"Реализовать новую фичу",
	"Исправить баг в модуле оплаты",
	"Оптимизировать загрузку страницы",
	"Написать документацию",
	"Провести код-ревью",
	"Настроить CI/CD пайплайн",
	"Подготовить демо для клиента",
	"Анализ метрик пользовательского поведения",
	"Миграция на новую версию фреймворка",
];

const GOAL_TITLES = [
	"Повысить конверсию на 5%",
	"Сократить время загрузки на 30%",
	"Улучшить UX формы регистрации",
	"Автоматизировать рутинные задачи",
	"Провести обучение команды",
	"Снизить количество инцидентов в продакшене",
	"Увеличить покрытие автотестами до 80%",
];

// === Инициализация мок-данных ===

export async function initMockData() {
	const existingUsers = await userApi.getAll();
	if (existingUsers.length > 0) {
		console.log("[DB] Мок-данные уже существуют, пропускаем инициализацию");
		return;
	}

	console.log("[DB] Инициализация мок-данных...");

	// === 1. Цикл оценки ===
	const cycle: Cycle = {
		id: "c1",
		name: "H2 2025",
		startDate: "2025-07-01",
		endDate: "2025-12-31",
		status: "active",
	};
	await cycleApi.put(cycle);

	// === 2. Руководитель ===
	const manager: User = {
		id: "mgr1",
		email: "manager@company.ru",
		fullName: "Петров Петр",
		role: "manager",
		department: "IT",
		specialization: "Engineering",
	};
	await userApi.put(manager);

	// === 3. Сотрудники (5 человек) ===
	const employeeNames = [
		"Иванов Иван",
		"Сидорова Анна",
		"Козлов Дмитрий",
		"Морозова Елена",
		"Волков Алексей",
	];

	const specializations = ["Frontend", "Backend", "QA", "DevOps", "Data"];

	const employees: User[] = [];
	for (let i = 0; i < 5; i++) {
		const emp: User = {
			id: `emp${i + 1}`,
			email: `emp${i + 1}@company.ru`,
			fullName: employeeNames[i],
			role: "employee",
			department: "IT",
			specialization: specializations[i],
			managerId: manager.id,
		};
		await userApi.put(emp);
		employees.push(emp);
	}

	// === 4. Задачи от руководителя ===
	const tasks: Task[] = [];
	const taskStartDate = new Date("2025-07-01");
	const taskEndDate = new Date("2025-12-15");

	for (const emp of employees) {
		const numTasks = randomInt(2, 4); // 2–4 задачи на сотрудника
		for (let i = 0; i < numTasks; i++) {
			const task: Task = {
				id: `task-${emp.id}-${i + 1}`,
				title: `${randomElement(TASK_TITLES)} (${emp.specialization})`,
				description: `Подробное описание задачи для ${emp.fullName} в направлении ${emp.specialization}`,
				assignedTo: emp.id,
				assignedBy: manager.id,
				department: "IT",
				specialization: emp.specialization,
				status: randomElement(["planned", "in-progress"]),
				createdAt: randomDate(taskStartDate, taskEndDate),
			};
			await taskApi.put(task);
			tasks.push(task);
		}
	}

	// === 5. Цели от сотрудников ===
	const goalStartDate = new Date("2025-07-01");
	const goalEndDate = new Date("2025-11-30");

	for (const emp of employees) {
		const empTasks = tasks.filter((t) => t.assignedTo === emp.id);
		if (empTasks.length === 0) continue;

		const numGoals = randomInt(1, Math.min(5, empTasks.length));
		for (let i = 0; i < numGoals; i++) {
			// Выбираем 1–3 задачи для цели
			const maxTaskCount = Math.min(3, empTasks.length);
			const taskCount = randomInt(1, maxTaskCount);
			const shuffledTasks = [...empTasks].sort(() => 0.5 - Math.random());
			const goalTasks = shuffledTasks.slice(0, taskCount);

			// Генерируем дедлайн (в пределах цикла)
			const deadlineDate = new Date(
				randomDate(goalStartDate, goalEndDate)
			);
			const deadline = deadlineDate.toISOString().split("T")[0]; // YYYY-MM-DD

			const goal: Goal = {
				id: `goal-${emp.id}-${i + 1}`,
				title: `${randomElement(GOAL_TITLES)} — ${emp.specialization}`,
				description: `Цель направлена на улучшение работы в области ${emp.specialization}`,
				expectedResult: "Измеримый бизнес-результат",
				deadline,
				taskIds: goalTasks.map((t) => t.id),
				authorId: emp.id,
				cycleId: cycle.id,
				status: "draft",
				createdAt: new Date().toISOString(),
			};
			await goalApi.put(goal);
		}
	}

	// === 6. Назначение оценок коллег (PeerAssignment) ===
	for (const reviewer of employees) {
		const possibleReviewees = employees.filter((e) => e.id !== reviewer.id);
		if (possibleReviewees.length === 0) continue;

		const numToReview = randomInt(2, Math.min(3, possibleReviewees.length));
		const reviewees = [...possibleReviewees]
			.sort(() => 0.5 - Math.random())
			.slice(0, numToReview);

		for (const reviewee of reviewees) {
			const assignment: PeerAssignment = {
				id: `pa-${reviewer.id}-${reviewee.id}`,
				cycleId: cycle.id,
				reviewerId: reviewer.id,
				employeeId: reviewee.id,
				status: "pending",
				assignedAt: new Date().toISOString(),
			};
			await peerAssignmentApi.put(assignment);
		}
	}

	console.log("[DB] ✅ Мок-данные успешно инициализированы!");
}
