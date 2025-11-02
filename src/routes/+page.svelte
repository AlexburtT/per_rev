<script lang="ts">
	import { goto } from "$app/navigation";

	import { userStore, loadUsersList } from "$lib/stores/userStore.svelte";

	import Select from "$lib/components/ui/Select.svelte";

	// Загружаем список пользователей для переключения (только для демо)
	$effect(() => {
		if (userStore.userList.length === 0) {
			loadUsersList();
		}
	});

	// Локальное значение для bind
	let selectedUserId = $state("");

	// Синхронизируем selectedUserId с userStore.currentUser
	$effect(() => {
		selectedUserId = userStore.currentUser?.id ?? "";
	});

	// При выборе — обновляем currentUser
	$effect(() => {
		if (selectedUserId) {
			const user = userStore.userList.find(
				(u) => u.id === selectedUserId
			);
			if (user) {
				userStore.currentUser = user;
				console.log("Выбран:", user.fullName);
			}
		} else {
			userStore.currentUser = undefined;
		}
	});

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

<svelte:head>
	<title>Performance Review</title>
</svelte:head>

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
	<p>Для тестирования функционала выберите пользователя:</p>
	<!-- Селектор пользователя -->
	<Select
		name="select_user"
		placeholder="— Выберите пользователя —"
		bind:value={selectedUserId}
		options={userStore.userList.map((u) => ({
			value: u.id,
			label: `${u.fullName} ${u.role}`,
		}))}
	/>

	<p>
		<strong>ВНИМАНИЕ!</strong> При первом запуске приложения
		инициализаруется база в indexedDB и наполняется mock данными. Если в
		списке всего один пользователь, пожалуйста обновите страницу
		<strong>F5</strong>
	</p>
	<br />
	<p>Employee - сотрудник</p>
	<p>Manager - руковдитель</p>

	<small
		>*/ В последующем это страница входа с формой (авторизация и
		аунтефикация)</small
	>
{/if}

<style>
	.link {
		color: var(--primary-medium);
		font-weight: 500;
		text-decoration: underline;
	}
</style>
