<script lang="ts">
	import ThemeToggle from "./theme-toggle.svelte";

	type LinksProps = {
		href: string;
		text: string;
	};

	let { childrenLinks }: { childrenLinks?: LinksProps[] } = $props();
</script>

<header class="app-header">
	{#if childrenLinks}
		<nav>
			{#each childrenLinks as link}
				<a href={link.href}>{link.text}</a>
			{/each}
		</nav>
	{/if}
	<ThemeToggle />
</header>
