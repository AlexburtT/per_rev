import type {
	TaskStatus,
	GoalStatus,
	UserRole,
	CycleStatus,
	SelfReviewStatus,
	PeerAssignmentStatus,
	DevelopmentDesire,
	SuccessorReadiness,
	RatingCategory,
	EmployeeReviewStatus,
} from "$lib/types/types";

// === Статусы задач ===
export const taskStatusLabels: Record<TaskStatus, string> = {
	planned: "Запланирована",
	"in-progress": "В работе",
	completed: "Завершена",
	cancelled: "Отменена",
};

// === Статусы целей ===
export const goalStatusLabels: Record<GoalStatus, string> = {
	draft: "Черновик",
	submitted: "В работе",
	self_reviewed: "Самооценка",
	peer_review: "Оценка коллег",
	manager_review: "Оценка руководителя",
	completed: "Завершена",
	cancelled: "Отменена",
};

// === Роли пользователей ===
export const userRoleLabels: Record<UserRole, string> = {
	employee: "Сотрудник",
	manager: "Руководитель",
	hr: "HR-специалист",
};

// === Статусы циклов оценки ===
export const cycleStatusLabels: Record<CycleStatus, string> = {
	active: "Активен",
	closed: "Завершён",
};

// === Статусы самооценки ===
export const selfReviewStatusLabels: Record<SelfReviewStatus, string> = {
	draft: "Черновик",
	submitted: "Отправлена",
};

// === Статусы назначения коллег ===
export const peerAssignmentStatusLabels: Record<PeerAssignmentStatus, string> =
	{
		pending: "Ожидает",
		completed: "Выполнено",
		skipped: "Пропущено",
	};

// === Готовность к развитию ===
export const developmentDesireLabels: Record<DevelopmentDesire, string> = {
	proactive: "Хочу развиваться",
	needsHelp: "Нужна поддержка",
	unsure: "Не определился",
	no: "Не интересует",
};

// === Готовность быть преемником ===
export const successorReadinessLabels: Record<SuccessorReadiness, string> = {
	"1-2y": "1–2 года",
	"3y": "3 года",
	"3+y": "Более 3 лет",
};

// === Категории оценки ===
export const ratingCategoryLabels: Record<RatingCategory, string> = {
	low: "Низкий",
	medium: "Средний",
	high: "Высокий",
};

// === Статусы оценки сотрудника ===
export const employeeReviewStatusLabels: Record<EmployeeReviewStatus, string> =
	{
		"in-progress": "В процессе",
		completed: "Завершена",
		locked: "Заблокирована",
	};
