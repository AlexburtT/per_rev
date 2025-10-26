<script lang="ts">
	import { onMount } from "svelte";
	import { userApi } from "$lib/db";
	import type { User } from "$lib/types/types";

	let user = $state(<User | undefined>undefined);
	let loading = $state(true);

	onMount(async () => {
		console.log("Запрашиваем emp1...");
		const u = await userApi.getById("emp1");
		console.log("Результат:", u);
		user = u;
		loading = false;
	});
</script>

{#if loading}
	<p>Загрузка пользователя...</p>
{:else if user}
	<h1>Привет, {user.fullName}!</h1>
{:else}
	<p>Пользователь не найден!</p>
{/if}
