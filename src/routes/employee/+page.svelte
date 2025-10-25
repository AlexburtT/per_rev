<script lang="ts">
	import Card from "$lib/components/ui/Card.svelte";
	import Breadcrumbs from "$lib/components/layouts/Breadcrumbs.svelte";

	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>

<div class="nav">
	<Breadcrumbs items={[{ title: "Главная" }]} />
	<div class="info-user">
		<p>Отдел: {data.user.department}</p>
		<p>Руководитель: Петров Сидор Иванович</p>
		<p>Должность: JS - разработчик</p>
		<p><strong>{data.user.fullName}</strong></p>
	</div>
</div>

<a href="#/employee/goals"
	><Card
		icon="target"
		title="Цели и задачи"
		description="Здесь находятся ваши цели, всего сейчас 1. Вывести кол-во целей и их описание если возможно"
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
	.nav {
		display: flex;
		align-items: center;
		margin-bottom: 1rem;
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
