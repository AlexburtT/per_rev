<script lang="ts">
	import logo from "$lib/assets/Wink_new.svg";
	import { clearUser, userStore } from "$lib/stores/userStore.svelte";

	import { page } from "$app/state";
	import Breadcrumbs from "$lib/components/layouts/Breadcrumbs.svelte";
	import type { Goal } from "$lib/types/types";

	interface Props {
		data?: Record<string, any>;
	}

	const { data }: Props = $props();

	// Извлекаем путь из хеша
	const hashPath = $derived(page.url.hash.replace(/^#/, "") || "/");

	// Определяем, нужно ли показывать крошки
	const showBreadcrumbs = $derived(
		hashPath.startsWith("/employee") && hashPath !== "/"
	);

	// Получаем goal.title из data, если есть
	const goalTitle = $derived((data?.goal as Goal | undefined)?.title ?? null);

	//Для GitHub Pages необходимо или в ссылку ниже вставить /per_rev/ или base делать
</script>

<header class="app-header">
	<a href="/per_rev/" onclick={() => clearUser()}>
		<img src={logo} alt="Логотип Performance Review" class="logo" />
	</a>
	{#if showBreadcrumbs}
		<div class="header-breadcrumbs">
			<Breadcrumbs {hashPath} {goalTitle} />
		</div>
		<div class="info-user">
			<p>
				<strong>{userStore.currentUser?.fullName}</strong>
			</p>
		</div>
	{/if}
</header>

<style>
	.app-header {
		width: 100%;
		margin-bottom: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		padding: 1rem;
		border-bottom: 1px solid var(--text-tertiary);
	}

	.logo {
		height: 3rem;
		padding-right: 2rem;
	}

	/*.info-user {
	}*/
</style>
