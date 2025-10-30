// src/lib/types.ts

export type UserRole = "employee" | "manager" | "hr";

export interface User {
	id: string;
	email: string;
	fullName: string;
	role: UserRole;
	department: string; // ← сделаем обязательным, т.к. логика завязана на отдел
	specialization?: string; // например, "DevOps", "Recruiting"
	managerId?: string; // ID руководителя (если есть)
}

// === Циклы оценки===
export type CycleStatus = "active" | "closed";

export interface Cycle {
	id: string;
	name: string;
	startDate: string; // ISO date
	endDate: string;
	status: CycleStatus;
}

// === Задачи (назначает руководитель) ===

export type TaskStatus = "planned" | "in-progress" | "completed" | "cancelled";

export interface Task {
	id: string;
	title: string;
	description?: string;
	expectedResult?: string;
	assignedTo?: string; // User.id
	assignedBy: string; // User.id (руководитель)
	department: string; // отдел, к которому относится задача
	specialization?: string; // специализация (опционально)
	status: TaskStatus;
	createdAt: string; // ISO
	completedAt?: string; // ISO
	deadline: string; // YYYY-MM-DD
}

// === Цели (пишет сотрудник) ===

export type GoalStatus = "draft" | "submitted" | "reviewed";

export interface Goal {
	id: string;
	title: string;
	description: string;
	expectedResult: string;
	deadline: string; // YYYY-MM-DD
	taskIds: string[]; // ссылки на Task.id (до 3 задач)
	tasks: Task[]; // для удобства
	authorId: string; // User.id — кто создал цель
	cycleId: string; // Cycle.id
	status: GoalStatus;
	createdAt: string; // ISO
}

// === Самооценка ===

export type SelfReviewStatus = "draft" | "submitted";

export interface SelfReview {
	id: string;
	employeeId: string; // User.id
	cycleId: string; // Cycle.id
	goalId: string; // Goal.id
	resultDescription: string;
	personalContribution: string;
	learnings: string;
	improvements: string;
	collaborationScore: number; // 0–10
	satisfactionScore: number; // 0–10
	status: SelfReviewStatus;
	submittedAt?: string; // ISO
}

// === Назначение оценки коллег (Peer Assignment) ===

export type PeerAssignmentStatus = "pending" | "completed" | "skipped";

export interface PeerAssignment {
	id: string;
	cycleId: string; // Cycle.id
	reviewerId: string; // User.id — кто оценивает
	employeeId: string; // User.id — кого оценивают
	status: PeerAssignmentStatus;
	assignedAt: string; // ISO
	completedAt?: string; // ISO
}

// === Оценка коллеги (Peer Review) ===

export interface PeerReview {
	id: string;
	assignmentId: string; // PeerAssignment.id
	taskId: string; // Task.id — по какой задаче оценка
	achievementScore: number; // 0–10
	qualitiesComment: string;
	collaborationScore: number; // 0–10
	improvementSuggestions: string;
	submittedAt: string; // ISO
}

// === Оценка руководителя ===

export type FinalRating = 0 | 1 | 2 | 3; // 0=нет, 1=низкий, 2=хороший, 3=сверх

export interface ManagerReview {
	id: string;
	managerId: string; // User.id
	employeeId: string; // User.id
	cycleId: string; // Cycle.id
	achievementScore: number; // 0–10
	qualitiesComment: string;
	personalContribution: string;
	collaborationScore: number; // 0–10
	improvements: string;
	finalRating: FinalRating;
	submittedAt: string; // ISO
}

// === Оценка потенциала (обычно от HR или руководителя) ===

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

export type DevelopmentDesire = "proactive" | "needsHelp" | "unsure" | "no";
export type SuccessorReadiness = "1-2y" | "3y" | "3+y";

export interface PotentialAssessment {
	id: string;
	employeeId: string; // User.id
	cycleId: string; // Cycle.id
	assessorId: string; // User.id (HR или руководитель)
	professionalQualities: ProfessionalQuality[];
	personalQualities: PersonalQuality[];
	neededMotivation1on1: boolean;
	communicationIssues: boolean;
	developmentDesire: DevelopmentDesire;
	successor: boolean;
	successorReadiness?: SuccessorReadiness;
	riskOfLeaving: number; // 0–10
	olePriority1: string;
	olePriority2: string;
	createdAt: string; // ISO
}

// === Итоговая сводка по сотруднику за цикл ===

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

// === Полная запись оценки сотрудника за цикл ===

export type EmployeeReviewStatus = "in-progress" | "completed" | "locked";

export interface EmployeeReview {
	id: string;
	employeeId: string; // User.id
	cycleId: string; // Cycle.id
	selfReviewId?: string; // SelfReview.id
	managerReviewId?: string; // ManagerReview.id
	potentialAssessmentId?: string; // PotentialAssessment.id
	peerReviewIds: string[]; // PeerReview.id[]
	summary?: Summary;
	status: EmployeeReviewStatus;
	updatedAt: string; // ISO
}
