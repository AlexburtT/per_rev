<script lang="ts">
	//import ThemeToggle from "./theme-toggle.svelte";
	import { page } from "$app/stores";
	import logo from "$lib/assets/logo.svg";

	type LinksProps = {
		href: string;
		text: string;
	};

	let { childrenLinks }: { childrenLinks?: LinksProps[] } = $props();
</script>

<header class="app-header">
	<div class="app-container">
		<a href="/">
			<img src={logo} alt="Логотип Performance Review" class="logo" />
		</a>

		{#if childrenLinks}
			<nav>
				{#each childrenLinks as link}
					<a
						class="header-link"
						href={link.href}
						class:active={$page.url.pathname === link.href}
						>{link.text}</a
					>
				{/each}
			</nav>
		{/if}
		<!--<ThemeToggle />-->
	</div>
</header>

<style>
	.app-header {
		width: 100%;
		background: var(--pr-gradient);

		.app-container {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 1rem 0;
		}
	}

	.logo {
		height: 3rem;
	}

	.header-link {
		margin-left: 1rem;
		font-weight: 500;
		color: var(--pr-text);
	}

	.header-link:hover {
		text-decoration: underline;
	}

	.header-link.active {
		color: var(--pr-orange);
	}

	/* Адаптивное позиционирование для экранов > 1200px */
	@media (min-width: 1200px) {
		.header-link {
			margin-left: 2rem;
		}
	}
</style>
