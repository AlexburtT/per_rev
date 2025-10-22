<script lang="ts">
	import { page } from "$app/stores";
	import { resolve } from "$app/paths";
	import Footer from "$lib/components/layouts/Footer.svelte";
	import Header from "$lib/components/layouts/Header.svelte";
	import { fade } from "svelte/transition";

	let { children } = $props();
</script>

<svelte:head>
	<title>Performance Review</title>
</svelte:head>

<Header
	childrenLinks={[
		{ href: resolve("/employee"), text: "Я сотрудник" },
		{ href: resolve("/manager"), text: "Я руководитель" },
		{ href: resolve("/ui"), text: "Компоненты UI" },
	]}
/>

<main class="app-main">
	{#key $page.url.pathname}
		<div in:fade class="app-container">
			{@render children()}
		</div>
	{/key}
</main>
<Footer />
