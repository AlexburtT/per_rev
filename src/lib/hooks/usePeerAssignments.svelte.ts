// src/lib/hooks/usePeerAssignments.ts

import { peerAssignmentApi } from "$lib/db";
import type { PeerAssignment } from "$lib/types/types";

export function usePeerAssignments(reviewerId: string) {
	let assignments = $state<PeerAssignment[]>([]);
	let loading = $state(true);

	$effect(() => {
		loading = true;
		peerAssignmentApi.getByReviewer(reviewerId).then((a) => {
			assignments = a;
			loading = false;
		});
	});

	return { assignments, loading };
}
