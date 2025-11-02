<!-- src/routes/employee/self-review/[id]/+page.svelte -->
<script lang="ts">
	import { goto } from "$app/navigation";
	import { userStore } from "$lib/stores/userStore.svelte";
	import { mapSelfReviewFormDataToEntity } from "$lib/utils/mapFormDataToEntry";
	import type { Goal } from "$lib/types/types";
	import type { SelfReviewData } from "$lib/types/forms";

	let { data } = $props<{ goal: Goal }>();
</script>

<svelte:head>
	<title>Анкета самооценки — {data.goal.title}</title>
</svelte:head>

<div class="container__title">
	<h1>Анкета самооценки</h1>
	<p class="goal-info">Цель: <strong>{data.goal.title}</strong></p>
</div>
