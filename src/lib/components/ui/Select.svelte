<script lang="ts">
	const { label, name, value, options } = $props<{
		label?: string;
		name: string;
		value?: string;
		options: { value: string; label: string }[];
	}>();

	let internalValue = $state(value ?? "");
</script>

<label>
	{#if label}{label}{/if}
	<select {name} bind:value={internalValue}>
		{#each options as opt}
			<option value={opt.value}>{opt.label}</option>
		{/each}
	</select>
</label>
