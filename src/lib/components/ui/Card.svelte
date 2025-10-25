<script lang="ts">
	import { iconMap } from "$lib/components/icons/iconMap";

	interface Props {
		title: string;
		description: string;
		icon?: keyof typeof iconMap;
	}

	let { title, description, icon }: Props = $props();

	const IconComponent = $derived(icon ? iconMap[icon] : undefined);
</script>

<div class="card">
	{#if IconComponent}
		<div class="card-icon">
			<IconComponent />
		</div>
	{/if}
	<h2>{title}</h2>
	<p>{description}</p>
</div>

<style>
	.card {
		display: flex;
		gap: 1rem;
		align-items: center;
		border: 1px solid var(--text-tertiary);
		margin-bottom: 1rem;
		border-radius: 0.5rem;
		padding: 1rem;
	}

	.card:hover {
		border-color: var(--primary);
		.card-icon {
			color: var(--primary);
		}
	}
</style>
