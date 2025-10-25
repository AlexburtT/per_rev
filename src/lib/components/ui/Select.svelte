<script lang="ts">
	interface Option {
		value: string;
		label: string;
	}

	interface Props {
		name: string;
		label?: string;
		value?: string;
		options: Option[];
		disabled?: boolean;
		required?: boolean;
	}

	const {
		name,
		label,
		value = "",
		options,
		disabled = false,
		required = false,
	} = $props();

	let internalValue = $state(value);
</script>

<label class="select">
	{#if label}
		<span class="select__label"
			>{label}{#if required}<span aria-hidden="true">*</span>{/if}</span
		>
	{/if}
	<select
		{name}
		{disabled}
		{required}
		bind:value={internalValue}
		class="select__field"
	>
		{#each options as opt}
			<option value={opt.value}>{opt.label}</option>
		{/each}
	</select>
</label>

<style>
	.select {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.select__label {
		font-size: 0.875rem;
		color: var(--text);
		font-weight: 500;
	}

	.select__label > span {
		color: var(--danger);
		margin-left: 2px;
	}

	.select__field {
		width: 100%;
		padding: 0.625rem 0.75rem;
		border: 1px solid var(--divider);
		border-radius: 6px;
		background: var(--surface);
		color: var(--text);
		font-size: 1rem;
		appearance: none;
		background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23767676' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
		background-repeat: no-repeat;
		background-position: right 0.75rem center;
		background-size: 16px 12px;
		padding-right: 2.25rem;
	}

	.select__field:focus {
		outline: none;
		border-color: var(--primary);
		box-shadow: 0 0 0 2px rgba(7, 69, 145, 0.15);
	}

	.select__field:disabled {
		background-color: var(--bg);
		color: var(--text-disabled);
		cursor: not-allowed;
		background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23bababa' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
	}
</style>
