<!-- src/routes/peer-review/ -->
<script lang="ts">
	import Card from "$lib/components/ui/Card.svelte";
	import type { PeerAssignment } from "$lib/types/types";
	import { userStore } from "$lib/stores/userStore.svelte";

	let { data } = $props<{ assignments: PeerAssignment[] }>();

	// Группируем по статусу
	const pending = data.assignments.filter(
		(a: { status: string }) => a.status === "pending"
	);
	const completed = data.assignments.filter(
		(a: { status: string }) => a.status === "completed"
	);
	const skipped = data.assignments.filter(
		(a: { status: string }) => a.status === "skipped"
	);

	const getEmployeeName = (employeeId: string): string => {
		const user = userStore.userList.find((u) => u.id === employeeId);
		return user ? user.fullName : "Неизвестный сотрудник";
	};
</script>

<svelte:head>
	<title>Rewiew коллег</title>
</svelte:head>

<div class="conteiner__title">
	<h1>Rewiew коллег</h1>
</div>

<p>Статусы: Назначенные ({pending.length}), Завершённые ({completed.length})</p>

{#if data.assignments.length === 0}
	<p>Нет назначенных оценок коллег.</p>
{:else}
	<div class="assignments-grid">
		<!-- Назначенные -->
		<div class="column">
			<h2>Назначенные ({pending.length})</h2>
			{#each pending as assignment}
				<a
					href="#/employee/peer-review/{assignment.id}"
					class="assignment-link"
				>
					<Card
						title={getEmployeeName(assignment.employeeId)}
						layout="vertical"
					>
						<p class="status-hint">Требуется оценка</p>
					</Card>
				</a>
			{/each}
		</div>

		<!-- Завершённые -->
		<div class="column">
			<h2>Завершённые ({completed.length})</h2>
			{#each completed as assignment}
				<Card
					title={getEmployeeName(assignment.employeeId)}
					layout="vertical"
				>
					<p class="status-hint">Оценка отправлена</p>
				</Card>
			{/each}
		</div>
	</div>
{/if}

<style>
	.assignments-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
		margin-top: 1rem;
	}

	.column h2 {
		font-size: 1.1rem;
		margin-bottom: 1rem;
		color: var(--text-secondary);
	}

	.assignment-link {
		text-decoration: none;
	}

	.status-hint {
		font-size: 0.875rem;
		color: var(--text-muted);
	}
</style>
