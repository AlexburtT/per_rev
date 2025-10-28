<script lang="ts">
	import Card from "$lib/components/ui/Card.svelte";
	import Breadcrumbs from "$lib/components/layouts/Breadcrumbs.svelte";
	import { employeeBreadcrumbs } from "$lib/utils/breadcrumbs";
	import { page } from "$app/state";

	let { data } = $props();

	const { user, goals, managerName } = data;
</script>

<Breadcrumbs items={employeeBreadcrumbs(page.url.pathname)} />

<div class="conteiner_title">
	<h1>Dashboard</h1>
	<div class="info-user">
		<p>Ваш отдел: <strong>{user.department}</strong></p>
		<p>Ваш руководитель: <strong>{managerName}</strong></p>
		<p>
			Ваша должность: <strong>{user.specialization}</strong>
		</p>
	</div>
</div>

<a href="/employee/goals">
	<Card
		icon="target"
		title="Цели и задачи"
		description={`Всего целей: ${goals.length}`}
	></Card>
</a>

<a href="/employee/self-review">
	<Card
		icon="thumbsUp"
		title="Самооценка по целям"
		description="Здесь находяится список ваших целей и самооценка по ним. Вывести общий бал, рекомендации"
	/>
</a>

<a href="/employee/peer-review">
	<Card
		icon="users"
		title="Rewiew коллег"
		description="Здесь находятся задачи по оценке коллег, сейчас их нет. Количество сколько коллег необхолдимо проревьюить"
	/>
</a>

<a href="/employee/result">
	<Card
		icon="trendingUp"
		title="Результаты"
		description="Здесь находятся пройденные полностью Performance Review с вашим результатом и комментариями. Вывести общий бал, рекомендации"
	/>
</a>

<style>
	:global(.conteiner_title) {
		display: flex;
		align-items: center;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--text-tertiary);
	}

	.info-user {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 1rem;
		width: 100%;
	}
</style>
