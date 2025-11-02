import { peerAssignmentApi, peerReviewApi } from "$lib/db";
import type { PeerAssignment, PeerReview } from "$lib/types/types";

// src/lib/api/peerReviews.ts
export async function savePeerReview(review: PeerReview) {
	await peerReviewApi.put(review);
}

// src/lib/api/peerAssignment.ts
export async function update(assignment: PeerAssignment) {
	await peerAssignmentApi.put(assignment);
}
