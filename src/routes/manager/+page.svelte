<script lang="ts">
	import { onMount } from "svelte";
	import * as api from "$lib/api";
	import type { User } from "$lib/types/types";

	let user = $state(<User | undefined>undefined);
	let loading = $state(true);

	onMount(async () => {
		const u = await api.users.getCurrentUser();
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
