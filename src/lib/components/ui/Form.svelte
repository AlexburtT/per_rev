<script lang="ts">
	import type { Snippet } from "svelte";
	import Button from "./Button.svelte";

	export interface Props {
		name: string;
		submitLabel: string;
		onSubmit?: (event: Event) => void;
		children?: Snippet<[]>;
	}

	let { name, children, submitLabel, onSubmit }: Props = $props();
</script>

<form {name} class="form" onsubmit={onSubmit}>
	{#if children}
		<div class="form-fields">
			{@render children()}
		</div>
	{/if}

	<Button type="submit" title={submitLabel} />
</form>

<style>
	.form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1.5rem;
		background: var(--surface);
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	}

	.form-fields {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
