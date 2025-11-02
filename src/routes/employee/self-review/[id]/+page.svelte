<!-- src/routes/employee/self-review/[id]/+page.svelte -->
<script lang="ts">
	import * as api from "$lib/api";
	import { goto } from "$app/navigation";
	import SelfReviewForm from "$lib/features/self-review/SelfReviewForm.svelte";
	import { updateGoal, userStore } from "$lib/stores/userStore.svelte";
	import type { SelfReviewData } from "$lib/types/forms";
	import type { Goal } from "$lib/types/types";
	import { mapSelfReviewFormDataToEntity } from "$lib/utils/mapFormDataToEntry";

	let { data } = $props<{ goal: Goal }>();
	let isSubmitting = $state(false);

	const handleSelfReviewSubmit = async (formData: SelfReviewData) => {
		isSubmitting = true;

		try {
			// 1. Сохраняем самооценку на сервере
			const selfReview = mapSelfReviewFormDataToEntity(
				formData,
				data.goal,
				userStore.currentUser!
			);
			await api.selfReviews.saveSelfReview(selfReview);

			// 2. Назначаем коллег через API (сервер сам решает, кого назначить)
			const assignments =
				await api.peerAssignment.createAssignmentsForGoal(data.goal.id);

			// 3. Обновляем статус цели на "peer_review"
			const updatedGoal = JSON.parse(
				JSON.stringify({
					...data.goal,
					status: "peer_review",
				})
			) as Goal;
			await updateGoal(updatedGoal);

			// 4. Переход
			goto("#/employee/self-review");
		} catch (err) {
			console.error("Ошибка при отправке самооценки:", err);
			alert("Не удалось отправить форму. Попробуйте позже.");
		} finally {
			isSubmitting = false;
		}
	};
</script>

<svelte:head>
	<title>Анкета самооценки — {data.goal.title}</title>
</svelte:head>

<div class="container__title">
	<h1>Анкета самооценки</h1>
	<p class="goal-info">Цель: <strong>{data.goal.title}</strong></p>
</div>

<SelfReviewForm onSuccess={handleSelfReviewSubmit} />
