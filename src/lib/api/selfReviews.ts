import type { SelfReview } from "$lib/types/types";
import { selfReviewApi } from "$lib/db";

export async function getSelfReviewByGoalId(
	goalId: string
): Promise<SelfReview | null> {
	try {
		const reviews = await selfReviewApi.getByGoalId(goalId);
		return reviews.length > 0 ? reviews[0] : null;
	} catch {
		return null;
	}
}

export async function saveSelfReview(review: SelfReview): Promise<SelfReview> {
	await selfReviewApi.put(review);
	return review;
}
