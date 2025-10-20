// src/lib/db/mockDb.ts

import type {
	User,
	Cycle,
	Goal,
	SelfReview,
	PeerReview,
	ManagerReview,
	PotentialAssessment,
} from "$lib/types/types";

// === Вспомогательные утилиты ===

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// === Мок-данные пользователей ===

const MOCK_USERS: Record<string, User> = {
	u1: {
		id: "u1",
		email: "employee@company.ru",
		fullName: "Иванов Иван",
		role: "employee",
		department: "IT",
		managerId: "u2",
	},
	u2: {
		id: "u2",
		email: "manager@company.ru",
		fullName: "Петров Петр",
		role: "manager",
		department: "IT",
		managerId: "",
	},
	u3: {
		id: "u3",
		email: "reviewer@company.ru",
		fullName: "Сидорова Анна",
		role: "reviewer",
		department: "Finance",
		managerId: "u4",
	},
};

// === Текущий цикл ===

const CURRENT_CYCLE: Cycle = {
	id: "c1",
	name: "H1 2025",
	startDate: "2025-01-01",
	endDate: "2025-06-30",
	status: "active",
};

// === Хранилища ===

const goals: Record<string, Goal[]> = {
	u1: [
		{
			id: "g1",
			title: "Оптимизация подписки",
			description: "Снизить количество кликов при оформлении",
			expectedResult: "Рост оплаты +1%",
			deadline: "2025-06-15",
			tasks: ["Задача 1", "Задача 2", "Задача 3"],
		},
	],
};

const selfReviews: Record<string, SelfReview> = {};
const peerReviews: Record<string, PeerReview[]> = {}; // ключ: `${employeeId}-${reviewerId}`
const managerReviews: Record<string, ManagerReview> = {}; // ключ: employeeId
const potentialAssessments: Record<string, PotentialAssessment> = {};

// === Публичный API мок-базы ===

export const mockDb = {
	// Пользователи
	getUserByEmail: (email: string): User | undefined =>
		Object.values(MOCK_USERS).find((u) => u.email === email),

	getUserById: (id: string): User | undefined => MOCK_USERS[id],

	getAllUsers: () => Object.values(MOCK_USERS),

	// Циклы
	getCurrentCycle: () => CURRENT_CYCLE,

	// Цели
	getGoals: (userId: string): Goal[] => goals[userId] || [],
	setGoals: (userId: string, userGoals: Goal[]) => {
		goals[userId] = userGoals;
	},

	// Самооценка
	getSelfReview: (userId: string): SelfReview | null =>
		selfReviews[userId] || null,
	setSelfReview: (userId: string, review: SelfReview) => {
		selfReviews[userId] = review;
	},

	// Оценка от респондентов
	getPeerReviews: (employeeId: string, reviewerId: string): PeerReview[] =>
		peerReviews[`${employeeId}-${reviewerId}`] || [],
	addPeerReview: (
		employeeId: string,
		reviewerId: string,
		review: PeerReview
	) => {
		const key = `${employeeId}-${reviewerId}`;
		if (!peerReviews[key]) peerReviews[key] = [];
		peerReviews[key].push(review);
	},

	// Оценка руководителя
	getManagerReview: (employeeId: string): ManagerReview | null =>
		managerReviews[employeeId] || null,
	setManagerReview: (employeeId: string, review: ManagerReview) => {
		managerReviews[employeeId] = review;
	},

	// Потенциал
	getPotentialAssessment: (employeeId: string): PotentialAssessment | null =>
		potentialAssessments[employeeId] || null,
	setPotentialAssessment: (
		employeeId: string,
		assessment: PotentialAssessment
	) => {
		potentialAssessments[employeeId] = assessment;
	},

	// Имитация задержки (для UX)
	wait: () => delay(300),
};
