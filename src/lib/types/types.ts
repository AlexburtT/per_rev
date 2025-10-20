// src/lib/types.ts

export type UserRole = "employee" | "reviewer" | "manager" | "hr";

export interface User {
	id: string;
	email: string;
	fullName: string;
	role: UserRole;
	department?: string;
	managerId?: string;
}

// === Циклы и цели ===

export interface Cycle {
	id: string;
	name: string;
	startDate: string; // ISO date
	endDate: string;
	status: "active" | "closed";
}

export interface Goal {
	id: string;
	title: string;
	description: string;
	expectedResult: string;
	deadline: string; // YYYY-MM-DD
	tasks: string[]; // до 3 задач
}

// === Самооценка ===

export interface SelfReview {
	goalId: string;
	resultDescription: string;
	personalContribution: string;
	learnings: string;
	improvements: string;
	collaborationScore: number; // 0–10
	satisfactionScore: number; // 0–10
	status: "draft" | "submitted";
}

// === Оценка от респондента ===

export interface PeerReview {
	taskId: string;
	achievementScore: number; // 0–10
	qualitiesComment: string;
	collaborationScore: number; // 0–10
	improvementSuggestions: string;
}

// === Оценка руководителя ===

export interface ManagerReview {
	employeeId: string;
	achievementScore: number; // 0–10
	qualitiesComment: string;
	personalContribution: string;
	collaborationScore: number; // 0–10
	improvements: string;
	finalRating: number; // 0–10 → 0=нет, 1=низкий, 2=хороший, 3=сверх
}

// === Потенциал ===

export type ProfessionalQuality =
	| "responsibility"
	| "resultOrientation"
	| "proactivity"
	| "openMindset"
	| "teamPlayer";

export type PersonalQuality =
	| "takesMoreResponsibility"
	| "transparentCommunication"
	| "sharesInfoPromptly"
	| "structuresWork";

export interface PotentialAssessment {
	professionalQualities: ProfessionalQuality[];
	personalQualities: PersonalQuality[];
	neededMotivation1on1: boolean;
	communicationIssues: boolean;
	developmentDesire: "proactive" | "needsHelp" | "unsure" | "no";
	successor: boolean;
	successorReadiness?: "1-2y" | "3y" | "3+y";
	riskOfLeaving: number; // 0–10
	olePriority1: string;
	olePriority2: string;
}

// === Итоги ===

export type RatingCategory = "low" | "medium" | "high";

export interface Summary {
	effectivenessScore: number; // 0–11
	_360Score: number; // 0–5 (конвертировано из 0–10)
	potentialScore: number; // 1–3
	totalScore: number; // макс. 19
	ratingCategory: RatingCategory;
	recommendations: string[];
	finalComment: string;
}
