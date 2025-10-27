<script lang="ts">
	interface Props {
		name: string;
		label?: string;
		checked?: boolean;
		disabled?: boolean;
		required?: boolean;
	}

	const {
		name,
		label,
		checked = false,
		disabled = false,
		required = false,
	} = $props();

	let internalChecked = $state(checked);
</script>

<label class="checkbox">
	<input
		type="checkbox"
		{name}
		{disabled}
		{required}
		bind:checked={internalChecked}
		class="checkbox__input"
	/>
	<span class="checkbox__custom">
		{#if internalChecked}
			<svg
				width="12"
				height="12"
				viewBox="0 0 12 12"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M1 6L4 9L11 2"
					stroke="white"
					stroke-width="2"
					stroke-linecap="round"
				/>
			</svg>
		{/if}
	</span>
	{#if label}
		<span class="checkbox__label"
			>{label}{#if required}<span aria-hidden="true">*</span>{/if}</span
		>
	{/if}
</label>

<style>
	.checkbox {
		display: inline-flex;
		align-items: flex-start;
		gap: 0.5rem;
		cursor: pointer;
		user-select: none;
	}

	.checkbox__input {
		position: absolute;
		opacity: 0;
		pointer-events: none;
	}

	.checkbox__custom {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.25rem;
		height: 1.25rem;
		border: 1px solid var(--divider);
		border-radius: 4px;
		background: var(--surface);
		transition:
			background 0.2s,
			border-color 0.2s;
	}

	.checkbox:hover .checkbox__custom {
		border-color: var(--primary);
	}

	.checkbox__input:checked + .checkbox__custom {
		background: var(--primary);
		border-color: var(--primary);
	}

	.checkbox__input:disabled + .checkbox__custom {
		background: var(--bg);
		border-color: var(--divider);
		cursor: not-allowed;
	}

	.checkbox__input:disabled:checked + .checkbox__custom {
		background: var(--disabled);
	}

	.checkbox__label {
		color: var(--text);
		font-size: 1rem;
		line-height: 1.25rem;
	}

	.checkbox__label > span {
		color: var(--danger);
		margin-left: 2px;
	}

	.checkbox__input:disabled ~ .checkbox__label {
		color: var(--text-disabled);
		cursor: not-allowed;
	}
</style>
