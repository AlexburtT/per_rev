<script lang="ts">
	//import ThemeToggle from "./theme-toggle.svelte";
	import { page } from "$app/state";
	import logo from "$lib/assets/logo.svg";
	import logoWink from "$lib/assets/logo-wink.svg";

	const currentPath = $derived(page.url.hash);

	type LinksProps = {
		href: string;
		text: string;
	};

	let { childrenLinks }: { childrenLinks?: LinksProps[] } = $props();
</script>

<header class="app-header">
	<div class="app-container">
		<a href={resolve("/")}>
			<img src={logoWink} alt="Логотип Wink" class="logo" />
			<img src={logo} alt="Логотип Performance Review" class="logo" />
		</a>

		{#if childrenLinks}
			<nav>
				{#each childrenLinks as link}
					<a
						class="header-link"
						href={link.href}
						class:active={currentPath === link.href}>{link.text}</a
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
		background: var(--gradient);
		margin-bottom: 1rem;

		.app-container {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 1.5rem 0;
		}
	}

	.logo {
		height: 3rem;
		padding-right: 2rem;
	}

	.header-link {
		margin-left: 1rem;
		font-weight: 500;
		color: var(--surface);
	}

	.header-link:hover {
		text-decoration: underline;
	}

	.header-link.active {
		color: var(--warning);
	}
</style>
