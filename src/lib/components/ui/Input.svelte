<script lang="ts">
	type InputType =
		| "text"
		| "email"
		| "password"
		| "number"
		| "date"
		| "textarea";

	interface Props {
		name: string;
		label?: string;
		placeholder?: string;
		value?: string;
		type?: InputType;
		disabled?: boolean;
		required?: boolean;
		rows?: number; //только для textarea
	}

	let {
		name,
		label,
		placeholder,
		value = $bindable(""),
		type = "text",
		disabled = false,
		required = false,
		rows = 4,
	}: Props = $props();

	let internalValue = $state(value);
</script>

<label class="input">
	{#if label}
		<span class="input__label"
			>{label}{#if required}<span aria-hidden="true">*</span>{/if}</span
		>
	{/if}
	{#if type === "textarea"}
		<textarea
			{name}
			{placeholder}
			{disabled}
			{required}
			{rows}
			bind:value={internalValue}
			class="input__field input__field--textarea"
		></textarea>
	{:else}
		<input
			{name}
			{placeholder}
			{disabled}
			{required}
			{type}
			bind:value={internalValue}
			class="input__field"
		/>
	{/if}
</label>

<style>
	.input {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.input__label {
		font-size: 0.875rem;
		color: var(--text);
		font-weight: 500;
	}

	.input__label > span {
		color: var(--danger);
		margin-left: 2px;
	}

	.input__field {
		width: 100%;
		padding: 0.625rem 0.75rem;
		border: 1px solid var(--divider);
		border-radius: 6px;
		background: var(--surface);
		color: var(--text);
		font-size: 1rem;
		font-family: inherit;
		transition:
			border-color 0.2s,
			box-shadow 0.2s;
	}

	.input__field:focus {
		outline: none;
		border-color: var(--primary);
		box-shadow: 0 0 0 2px rgba(7, 69, 145, 0.15);
	}

	.input__field:disabled {
		background: var(--bg);
		color: var(--text-disabled);
		cursor: not-allowed;
	}

	.input__field::placeholder {
		color: var(--text-tertiary);
	}

	/* Особенности textarea */
	.input__field--textarea {
		resize: vertical;
		line-height: 1.5;
	}

	/* Стиль для date-поля (убираем стрелку в WebKit) */
	.input__field[type="date"] {
		appearance: none;
	}

	.input__field[type="date"]::-webkit-calendar-picker-indicator {
		filter: invert(30%) sepia(10%) saturate(10%) hue-rotate(0deg);
		cursor: pointer;
	}

	.input__field[type="date"]:disabled::-webkit-calendar-picker-indicator {
		filter: invert(60%);
		cursor: not-allowed;
	}
</style>
