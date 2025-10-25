<script lang="ts">
	import type { Snippet } from "svelte";

	import Input from "./Input.svelte";
	import Button from "./Button.svelte";

	// Типы полей
	type FieldType =
		| "text"
		| "textarea"
		| "date"
		| "checkbox"
		| "rating"
		| "peer-selector";

	interface PeerOption {
		value: string;
		label: string;
		role?: string;
	}

	export interface Field {
		name: string;
		label: string;
		type: FieldType;
		placeholder?: string;
		required?: boolean;
		options?: PeerOption[]; // для checkbox/peer-selector
		min?: number;
		max?: number;
	}

	interface Props {
		fields: Field[];
		onSubmit?: (data: Record<string, any>) => void;
		submitLabel?: string;
		children?: Snippet<[]>;
	}

	const {
		fields,
		onSubmit = (data) => console.log("Форма отправлена:", data),
		submitLabel = "Сохранить",
		children,
	}: Props = $props();

	let formData = $state<Record<string, any>>({});

	$effect.pre(() => {
		const initial: Record<string, any> = {};
		for (const field of fields) {
			if (field.type === "checkbox" || field.type === "peer-selector") {
				initial[field.name] = [];
			} else {
				initial[field.name] = "";
			}
		}
		formData = initial;
	});

	function handleSubmit(e: Event) {
		e.preventDefault();
		const cleanData = $state.snapshot(formData); // ← снапшот ДО отправки
		onSubmit(cleanData);

		// Очистка формы
		for (const field of fields) {
			if (field.type === "checkbox" || field.type === "peer-selector") {
				formData[field.name] = [];
			} else {
				formData[field.name] = "";
			}
		}
	}
	// Обновляем formData при изменении любого поля
	function updateField(name: string, value: any) {
		formData[name] = value;
	}
</script>

<form onsubmit={handleSubmit} class="form">
	{#each fields as field}
		<div class="form-field">
			{#if field.type === "text" || field.type === "date"}
				<Input
					name={field.name}
					label={field.label}
					placeholder={field.placeholder}
					type={field.type}
					required={field.required}
					bind:value={formData[field.name]}
				/>
			{:else if field.type === "textarea"}
				<Input
					name={field.name}
					label={field.label}
					placeholder={field.placeholder}
					type="textarea"
					required={field.required}
					bind:value={formData[field.name]}
				/>
			{:else if field.type === "checkbox"}
				<fieldset class="checkbox-group">
					<legend>{field.label}</legend>
					{#each field.options as opt}
						<div class="checkbox-item">
							<input
								type="checkbox"
								id={`${field.name}-${opt.value}`}
								name={field.name}
								value={opt.value}
								bind:group={formData[field.name]}
							/>
							<label for={`${field.name}-${opt.value}`}
								>{opt.label}</label
							>
						</div>
					{/each}
				</fieldset>
			{:else if field.type === "rating"}
				<div class="rating-scale">
					<label for={field.name}>{field.label}</label>
					<p>Оцените по шкале от 0 до 10</p>
					<div class="rating-buttons">
						{#each Array.from({ length: 11 }, (_, i) => i) as value}
							<button
								type="button"
								class:rating-selected={formData[field.name] ===
									value}
								onclick={() => updateField(field.name, value)}
							>
								{value}
							</button>
						{/each}
					</div>
					<!-- Скрытый input для связи с label и отправки формы -->
					<input
						type="hidden"
						id={field.name}
						name={field.name}
						bind:value={formData[field.name]}
					/>
					<div class="rating-emoticons">
						<span>😡</span>
						<span>😊</span>
					</div>
				</div>
			{:else if field.type === "peer-selector"}
				<fieldset class="peer-selector">
					<legend>{field.label}</legend>
					<div class="peer-list">
						{#each field.options as peer}
							<div class="peer-item">
								<input
									type="checkbox"
									id={`peer-${peer.value}`}
									name="peers"
									value={peer.value}
									bind:group={formData.peers}
								/>
								<label for={`peer-${peer.value}`}>
									<div class="peer-name">{peer.label}</div>
									<div class="peer-role">
										{peer.role ?? ""}
									</div>
								</label>
							</div>
						{/each}
					</div>
					<Button title="Подтвердить выбор" variant="primary" />
				</fieldset>
			{/if}
		</div>
	{/each}

	{#if children}
		<div class="form-actions">
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

	.form-field {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	/* --- Rating Scale --- */
	.rating-scale {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.rating-buttons {
		display: flex;
		gap: 0.25rem;
		margin-bottom: 0.5rem;
	}

	.rating-buttons button {
		width: 2rem;
		height: 2rem;
		border: 1px solid var(--divider);
		border-radius: 6px;
		background: var(--bg);
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.rating-buttons button:hover {
		background: var(--primary-light);
		color: white;
	}

	.rating-selected {
		background: var(--primary);
		color: white;
		border-color: var(--primary);
	}

	.rating-emoticons {
		display: flex;
		justify-content: space-between;
		font-size: 1.25rem;
	}

	/* --- Checkbox Group --- */
	.checkbox-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.checkbox-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.checkbox-item input[type="checkbox"] {
		width: 1.25rem;
		height: 1.25rem;
	}

	/* --- Peer Selector --- */
	.peer-selector {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.peer-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.peer-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.peer-item input[type="checkbox"] {
		width: 1.25rem;
		height: 1.25rem;
	}

	.peer-name {
		font-weight: 500;
	}

	.peer-role {
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.form-actions {
		display: flex;
		gap: 0.5rem;
		margin-top: 1rem;
	}
</style>
