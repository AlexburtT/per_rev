<script lang="ts">
	import logo from "$lib/assets/Wink_new.svg";
	import { userStore, loadUsersList } from "$lib/stores/userStore.svelte";

	import Select from "../ui/Select.svelte";

	// Загружаем список пользователей для переключения (только для демо)
	$effect(() => {
		loadUsersList();
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
</script>

<header class="app-header">
	<a href="#/">
		<img src={logo} alt="Логотип Performance Review" class="logo" />
	</a>

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
</header>

<style>
	.app-header {
		width: 100%;
		background: var(--gradient);
		margin-bottom: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 1rem;
	}

	.logo {
		height: 3rem;
		padding-right: 2rem;
	}
</style>
