<script lang="ts">
	import "$lib/assets/styles/main.css";
	import { page } from "$app/state";
	import Footer from "$lib/components/layouts/Footer.svelte";
	import Header from "$lib/components/layouts/Header.svelte";
	import { fade } from "svelte/transition";

	let { children } = $props();
</script>

<svelte:head>
	<title>Performance Review</title>
</svelte:head>

<Header />

<main class="app-main">
	{#key page.url.pathname}
		<div in:fade class="app-container">
			{@render children()}
		</div>
	{/key}
</main>
<Footer />
