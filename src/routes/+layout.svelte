<script lang="ts">
	import "$lib/assets/main.css";
	import Footer from "$lib/components/layouts/Footer.svelte";
	import Header from "$lib/components/layouts/Header.svelte";
</script>

<svelte:head>
	<title>Performance Review</title>
</svelte:head>

<Header childrenLinks={[{ href: "/ui", text: "Компоненты UI" }]} />
<main class="app-main">
	<slot />
</main>
<Footer />
