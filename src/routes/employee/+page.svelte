<script lang="ts">
	import Card from "$lib/components/ui/Card.svelte";
	import Breadcrumbs from "$lib/components/layouts/Breadcrumbs.svelte";
	import { userStore } from "$lib/stores/userStore.svelte";
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import * as api from "$lib/api";

	import type { Goal } from "$lib/types/types";

	let goals = $state<Goal[]>([]);
	let loading = $state(true);

	// Защита от прямого захода
	$effect(() => {
		if (
			!userStore.currentUser ||
			userStore.currentUser.role !== "employee"
		) {
			goto("/");
		}
	});

	// Загрузка данных сотрудника
	onMount(async () => {
		if (userStore.currentUser) {
			loading = true;
			try {
				goals = await api.goals.getByAuthor(userStore.currentUser.id);
			} finally {
				loading = false;
			}
		}
	});

	// Получаем ФИО руководителя реактивно
	const managerName = $derived(
		userStore.currentUser?.managerId
			? userStore.userList.find(
					(u) => u.id === userStore.currentUser?.managerId
				)?.fullName
			: undefined
	);
</script>

<Breadcrumbs items={[{ title: "Главная" }]} />

<div class="conteiner_title">
	<h1>Dashboard</h1>
	<div class="info-user">
		<p>Ваш отдел: <strong>{userStore.currentUser?.department}</strong></p>
		<p>Ваш руководитель: <strong>{managerName}</strong></p>
		<p>
			Ваша должность: <strong
				>{userStore.currentUser?.specialization}</strong
			>
		</p>
	</div>
</div>

<a href="#/employee/goals"
	><Card
		icon="target"
		title="Цели и задачи"
		description={`Всего целей: ${goals.length}`}
	></Card>
</a>

<Card
	icon="thumbsUp"
	title="Самооценка по целям"
	description="Здесь находяится список ваших целей и самооценка по ним. Вывести общий бал, рекомендации"
/>
<Card
	icon="users"
	title="Rewiew коллег"
	description="Здесь находятся задачи по оценке коллег, сейчас их нет. Количество сколько коллег необхолдимо проревьюить"
/>
<Card
	icon="trendingUp"
	title="Результаты"
	description="Здесь находятся пройденные полностью Performance Review с вашим результатом и комментариями. Вывести общий бал, рекомендации"
/>

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
