import type {
	DevelopmentDesire,
	PersonalQuality,
	ProfessionalQuality,
	SuccessorReadiness,
} from "./types";

export type TaskData = {
	title: string;
	description: string;
	result: string;
	dateEnd: string;
};

export type GoalData = {
	title: string;
	description: string;
	expectedResult: string;
	dateEnd: string;
};

export type SelfReviewData = {
	resultDescription: string;
	personalContribution: string;
	learnings: string;
	improvements: string;
	collaborationScore: number;
	satisfactionScore: number;
};

export type PeerReviewData = {
	taskId: string;
	achievementScore: number;
	qualitiesComment: string;
	collaborationScore: number;
	improvementSuggestions: string;
};

export type ManagerReviewData = {
	achievementScore: number;
	qualitiesComment: string;
	personalContribution: string;
	collaborationScore: number;
	improvements: string;
	finalRating: 0 | 1 | 2 | 3;
};

export type PotentialAssessmentData = {
	professionalQualities: ProfessionalQuality[];
	personalQualities: PersonalQuality[];
	neededMotivation1on1: boolean;
	communicationIssues: boolean;
	developmentDesire: DevelopmentDesire;
	successor: boolean;
	successorReadiness?: SuccessorReadiness;
	riskOfLeaving: number;
	olePriority1: string;
	olePriority2: string;
};
