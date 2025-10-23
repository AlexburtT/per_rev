<script lang="ts">
	import type { Component } from "svelte";
	interface Props {
		title: string;
		description: string;
		icon?: Component<{ class?: string }>;
	}

	let { title, description, icon: Icon }: Props = $props();
</script>

<div class="card">
	<div class="card-icon"></div>
	<h1>{title}</h1>
	<p>{description}</p>
</div>

<style>
	.card {
		border: 1px solid var(--text-tertiary);
		margin-bottom: 1rem;
		border-radius: 0.5rem;
		padding: 1rem;
	}

	.card:hover {
		border-color: var(--primary);
	}
</style>
