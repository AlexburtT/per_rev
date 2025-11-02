// src/lib/db/schema.ts

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

export const DB_NAME = "PerformanceReviewDB";
export const DB_VERSION = 2;

export const STORES = {
	USERS: "users",
	CYCLES: "cycles",
	TASKS: "tasks",
	GOALS: "goals",
	SELF_REVIEWS: "selfReviews",
	PEER_ASSIGNMENTS: "peerAssignments",
	PEER_REVIEWS: "peerReviews",
	MANAGER_REVIEWS: "managerReviews",
	POTENTIAL_ASSESSMENTS: "potentialAssessments",
	EMPLOYEE_REVIEWS: "employeeReviews",
} as const;

// Типы для строгой типизации
export type StoreName = (typeof STORES)[keyof typeof STORES];
export type StoreValue<T extends StoreName> = T extends "users"
	? User
	: T extends "cycles"
	? Cycle
	: T extends "tasks"
	? Task
	: T extends "goals"
	? Goal
	: T extends "selfReviews"
	? SelfReview
	: T extends "peerAssignments"
	? PeerAssignment
	: T extends "peerReviews"
	? PeerReview
	: T extends "managerReviews"
	? ManagerReview
	: T extends "potentialAssessments"
	? PotentialAssessment
	: T extends "employeeReviews"
	? EmployeeReview
	: never;
