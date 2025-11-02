import type {
	GoalData,
	TaskData,
	SelfReviewData,
	PeerReviewData,
	ManagerReviewData,
	PotentialAssessmentData,
} from "$lib/types/forms";
import type {
	Cycle,
	Goal,
	SelfReview,
	Task,
	User,
	PeerReview,
	ManagerReview,
	PotentialAssessment,
	PeerAssignment,
} from "$lib/types/types";

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
	deadline: goalData.dateEnd,
	taskIds: taskIds,
	authorId: user.id,
	cycleId: cycle.id,
	status: "draft",
	createdAt: new Date().toISOString(),
});

export const mapSelfReviewFormDataToEntity = (
	selfRewiewData: SelfReviewData,
	goal: Goal,
	user: User
): SelfReview => ({
	id: crypto.randomUUID(),
	employeeId: user.id,
	cycleId: goal.cycleId,
	goalId: goal.id,
	resultDescription: selfRewiewData.resultDescription,
	personalContribution: selfRewiewData.personalContribution,
	learnings: selfRewiewData.learnings,
	improvements: selfRewiewData.improvements,
	collaborationScore: selfRewiewData.collaborationScore,
	satisfactionScore: selfRewiewData.satisfactionScore,
	status: "draft",
});

// === Peer Review ===
export const mapPeerReviewFormDataToEntity = (
	data: PeerReviewData,
	assignment: PeerAssignment
): PeerReview => ({
	id: crypto.randomUUID(),
	assignmentId: assignment.id,
	taskId: data.taskId,
	achievementScore: data.achievementScore,
	qualitiesComment: data.qualitiesComment,
	collaborationScore: data.collaborationScore,
	improvementSuggestions: data.improvementSuggestions,
	submittedAt: new Date().toISOString(),
});

// === Manager Review ===
export const mapManagerReviewFormDataToEntity = (
	data: ManagerReviewData,
	manager: User,
	employeeId: string,
	cycleId: string
): ManagerReview => ({
	id: crypto.randomUUID(),
	managerId: manager.id,
	employeeId,
	cycleId,
	achievementScore: data.achievementScore,
	qualitiesComment: data.qualitiesComment,
	personalContribution: data.personalContribution,
	collaborationScore: data.collaborationScore,
	improvements: data.improvements,
	finalRating: data.finalRating,
	submittedAt: new Date().toISOString(),
});

// === Potential Assessment ===
export const mapPotentialAssessmentFormDataToEntity = (
	data: PotentialAssessmentData,
	assessor: User,
	employeeId: string,
	cycleId: string
): PotentialAssessment => ({
	id: crypto.randomUUID(),
	employeeId,
	cycleId,
	assessorId: assessor.id,
	professionalQualities: data.professionalQualities,
	personalQualities: data.personalQualities,
	neededMotivation1on1: data.neededMotivation1on1,
	communicationIssues: data.communicationIssues,
	developmentDesire: data.developmentDesire,
	successor: data.successor,
	successorReadiness: data.successorReadiness,
	riskOfLeaving: data.riskOfLeaving,
	olePriority1: data.olePriority1,
	olePriority2: data.olePriority2,
	createdAt: new Date().toISOString(),
});
