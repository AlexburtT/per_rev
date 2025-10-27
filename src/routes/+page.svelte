<script lang="ts">
	import { userStore } from "$lib/stores/userStore.svelte";
	import { goto } from "$app/navigation";

	// Редирект при выборе пользователя
	$effect(() => {
		if (userStore.currentUser) {
			if (userStore.currentUser.role === "manager") {
				goto("#/manager");
			} else {
				goto("#/employee");
			}
		}
	});
</script>

{#if userStore.currentUser}
	<p>Перенаправление...</p>
{:else}
	<h1>Performance Review</h1>
	<p>
		Посетите описание проекта на странице <a
			href="https://project13530243.tilda.ws/#rec1074252496"
			class="link">Performance Review</a
		>
	</p>
	<p>
		Для тестирования функционала Пожалуйста, выберите пользователя в шапке
	</p>
{/if}

<style>
	.link {
		color: var(--primary-medium);
		font-weight: 500;
		text-decoration: underline;
	}
</style>
