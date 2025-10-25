<script lang="ts">
	import { fieldComponents } from "./fieldComponents.js";
	import type { Field } from "$lib/types/types_field.js";

	const { fields } = $props<{ fields: Field[] }>();
</script>

<form>
	{#each fields as field}
		{@const Component = fieldComponents[field.type]}
		<div class="form-field">
			<Component {...field} />
		</div>
	{/each}
</form>

<style>
	.form-field {
		margin-bottom: 1rem;
	}
</style>
