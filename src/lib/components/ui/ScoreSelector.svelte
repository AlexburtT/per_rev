<!-- src/lib/components/ui/ScoreSelector.svelte -->
<script lang="ts">
	interface Props {
		name: string;
		label: string;
		value?: number; // для controlled-режима (опционально)
		required?: boolean;
		disabled?: boolean;
	}

	const { name, label, value, required = false, disabled = false } = $props();
</script>

<fieldset class="score-selector" aria-labelledby={name + "-label"} {disabled}>
	<legend id={name + "-label"} class="score-selector__label">
		{label}
	</legend>
	<div class="score-selector__buttons">
		{#each Array.from({ length: 11 }, (_, i) => i) as score}
			<label class="score-selector__item">
				<input
					type="radio"
					{name}
					value={score}
					checked={value !== undefined ? score === value : undefined}
					{required}
					{disabled}
				/>
				<span class="score-selector__button">{score}</span>
			</label>
		{/each}
	</div>
</fieldset>

<style>
	.score-selector {
		border: none;
		margin: 0 0 1.25rem 0;
		padding: 0;
	}

	.score-selector__label {
		font-weight: 600;
		font-size: 1rem;
		margin-bottom: 0.5rem;
		display: block;
		color: var(--text);
	}

	.score-selector__buttons {
		display: flex;
		gap: 0.4rem;
		flex-wrap: wrap;
	}

	.score-selector__item {
		position: relative;
		display: inline-block;
		width: 2.25rem;
		height: 2.25rem;
	}

	.score-selector__item input {
		position: absolute;
		opacity: 0;
		width: 100%;
		height: 100%;
		cursor: pointer;
		margin: 0;
	}

	.score-selector__button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		border: 1px solid var(--border);
		border-radius: 50%;
		font-weight: 600;
		font-size: 0.875rem;
		background: white;
		pointer-events: none;
		transition: all 0.2s;
	}

	.score-selector__item:hover .score-selector__button:not(.active) {
		background: var(--primary-light);
		border-color: var(--primary);
	}

	.score-selector__item input:checked + .score-selector__button {
		background: var(--primary);
		color: white;
		border-color: var(--primary);
	}

	fieldset:disabled .score-selector__item {
		opacity: 0.6;
		pointer-events: none;
	}
</style>
