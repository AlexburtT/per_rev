<script lang="ts">
	interface Props {
		title: string;
		description: string;
	}

	let { title, description }: Props = $props();
</script>

<div class="card">
	<h1>{title}</h1>
	<p>{description}</p>
</div>

<style>
	.card {
		border: 1px solid var(--pr-grey-light);
		margin-bottom: 1rem;
		border-radius: 0.5rem;
		padding: 1rem;
	}

	.card:hover {
		background: var(--pr-grey-light-2);
	}
</style>
