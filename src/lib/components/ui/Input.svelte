<script lang="ts">
	interface Props {
		name: string;
		label?: string;
		placeholder?: string;
		value?: string;
		disabled?: boolean;
	}

	const {
		name,
		label,
		placeholder,
		value = "",
		disabled = false,
	}: Props = $props();

	let internalValue = $state(value);
</script>

<label>
	{#if label}{label}{/if}
	<input {name} {placeholder} {disabled} bind:value={internalValue} />
</label>
