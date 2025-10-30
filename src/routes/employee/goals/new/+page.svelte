<script lang="ts">
	import GoalForm from "$lib/features/goal/GoalForm.svelte";
	import TasksList from "$lib/features/goal/TasksList.svelte";

	let { data } = $props();
</script>

<svelte:head>
	<title>Новая цель</title>
</svelte:head>

<div class="conteiner_title">
	<h1>Новая цель</h1>
</div>

<div class="newgoal__conteiner">
	<GoalForm authorId={data.user.id} user={data.user} />
	<TasksList />
</div>

<style>
	.newgoal__conteiner {
		display: grid;
		grid-template-columns: 2fr auto;
		gap: 1rem;
	}
</style>
