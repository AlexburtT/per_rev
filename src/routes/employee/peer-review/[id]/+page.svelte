<!-- src/routes/employee/peer-review/[id]/+page.svelte -->
<script lang="ts">
	import type { Goal, PeerAssignment, User } from "$lib/types/types";

	let { data } = $props<{
		assignment: PeerAssignment;
		employee: User;
		goal: Goal;
	}>();
</script>

<svelte:head>
	<title>Оценка коллеги — {data.employee.fullName}</title>
</svelte:head>

<div class="container__title">
	<h1>Анкета оценки коллеги</h1>
	<p class="goal-info">
		Сотрудник: <strong>{data.employee.fullName}</strong>
	</p>
	<p class="goal-info">Цель: <strong>{data.goal.title}</strong></p>
</div>
