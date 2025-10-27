// src/lib/db/index.ts

import {
	getAll,
	getOne,
	put,
	del,
	getByIndex,
	clearAllStores,
	destroyDB,
} from "./proxy";
import { STORES } from "./schema";
import type {
	User,
	Cycle,
	Task,
	Goal,
	SelfReview,
	PeerAssignment,
	PeerReview,
	ManagerReview,
	PotentialAssessment,
	EmployeeReview,
} from "$lib/types/types";

// --- Users ---
export const userApi = {
	getAll: () => getAll(STORES.USERS),
	getById: (id: string) => getOne(STORES.USERS, id),
	put: (user: User) => put(STORES.USERS, user),
};

// --- Cycles ---
export const cycleApi = {
	getAll: () => getAll(STORES.CYCLES),
	getActive: async (): Promise<Cycle | undefined> => {
		const cycles = await getAll(STORES.CYCLES);
		return cycles.find((c) => c.status === "active");
	},
	getById: (id: string) => getOne(STORES.CYCLES, id),
	put: (cycle: Cycle) => put(STORES.CYCLES, cycle),
};

// --- Tasks ---
export const taskApi = {
	getAll: () => getAll(STORES.TASKS),
	getByAssignedTo: (userId: string) =>
		getByIndex(STORES.TASKS, "byAssignedTo", userId),
	getByDepartment: (dept: string) =>
		getByIndex(STORES.TASKS, "byDepartment", dept),
	put: (task: Task) => put(STORES.TASKS, task),
	delete: (id: string) => del(STORES.TASKS, id),
};

// --- Goals ---
export const goalApi = {
	getAll: () => getAll(STORES.GOALS),
	getById: (id: string) => getOne(STORES.GOALS, id),
	getByAuthor: (authorId: string) =>
		getByIndex(STORES.GOALS, "byAuthor", authorId),
	getByCycle: (cycleId: string) =>
		getByIndex(STORES.GOALS, "byCycle", cycleId),
	put: (goal: Goal) => put(STORES.GOALS, goal),
	delete: (id: string) => del(STORES.GOALS, id),
};

// --- Peer Assignments ---
export const peerAssignmentApi = {
	getByReviewer: (reviewerId: string) =>
		getByIndex(STORES.PEER_ASSIGNMENTS, "byReviewer", reviewerId),
	getByEmployee: (employeeId: string) =>
		getByIndex(STORES.PEER_ASSIGNMENTS, "byEmployee", employeeId),
	getByCycle: (cycleId: string) =>
		getByIndex(STORES.PEER_ASSIGNMENTS, "byCycle", cycleId),
	put: (assignment: PeerAssignment) =>
		put(STORES.PEER_ASSIGNMENTS, assignment),
};

// --- Self Reviews ---
export const selfReviewApi = {
	getByEmployeeAndCycle: async (
		employeeId: string,
		cycleId: string
	): Promise<SelfReview | undefined> => {
		const reviews = await getByIndex(
			STORES.SELF_REVIEWS,
			"byEmployee",
			employeeId
		);
		return reviews.find((r) => r.cycleId === cycleId);
	},
	put: (review: SelfReview) => put(STORES.SELF_REVIEWS, review),
};

// --- Peer Reviews ---
export const peerReviewApi = {
	put: (review: PeerReview) => put(STORES.PEER_REVIEWS, review),
};

// --- Manager Reviews ---
export const managerReviewApi = {
	getByEmployeeAndCycle: async (
		employeeId: string,
		cycleId: string
	): Promise<ManagerReview | undefined> => {
		const reviews = await getAll(STORES.MANAGER_REVIEWS);
		return reviews.find(
			(r) => r.employeeId === employeeId && r.cycleId === cycleId
		);
	},
	put: (review: ManagerReview) => put(STORES.MANAGER_REVIEWS, review),
};

// --- Potential Assessments ---
export const potentialAssessmentApi = {
	getByEmployeeAndCycle: async (
		employeeId: string,
		cycleId: string
	): Promise<PotentialAssessment | undefined> => {
		const assessments = await getAll(STORES.POTENTIAL_ASSESSMENTS);
		return assessments.find(
			(a) => a.employeeId === employeeId && a.cycleId === cycleId
		);
	},
	put: (assessment: PotentialAssessment) =>
		put(STORES.POTENTIAL_ASSESSMENTS, assessment),
};

// --- Employee Reviews ---
export const employeeReviewApi = {
	getByEmployeeAndCycle: async (
		employeeId: string,
		cycleId: string
	): Promise<EmployeeReview | undefined> => {
		const reviews = await getAll(STORES.EMPLOYEE_REVIEWS);
		return reviews.find(
			(r) => r.employeeId === employeeId && r.cycleId === cycleId
		);
	},
	put: (review: EmployeeReview) => put(STORES.EMPLOYEE_REVIEWS, review),
};

// === Экспорт утилит ===
export { clearAllStores, destroyDB };
