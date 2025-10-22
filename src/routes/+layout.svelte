<script lang="ts">
	import Footer from "$lib/components/layouts/Footer.svelte";
	import Header from "$lib/components/layouts/Header.svelte";
</script>

<svelte:head>
	<title>Performance Review</title>
</svelte:head>

<Header
	childrenLinks={[
		{ href: "/employee", text: "Я сотрудник" },
		{ href: "/manager", text: "Я руководитель" },
		{ href: "/reviewer", text: "Я коллега (респондент)" },
		{ href: "/ui", text: "Компоненты UI" },
	]}
/>
<main class="app-main">
	<slot />
</main>
<Footer />
