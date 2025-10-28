<script lang="ts">
	import logo from "$lib/assets/Wink_new.svg";
	import { clearUser } from "$lib/stores/userStore.svelte";

	let { breadcrumbs } = $props();
</script>

<header class="app-header">
	<a href="/" onclick={() => clearUser()}>
		<img src={logo} alt="Логотип Performance Review" class="logo" />
	</a>
	{#if breadcrumbs}
		{@render breadcrumbs()}
	{/if}
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
