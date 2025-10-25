<script>
	const colors = {
		primary: "var(--primary)",
		"primary-medium": "var(--primary-medium)",
		"primary-dark": "var(--primary-dark)",
		"primary-light": "var(--primary-light)",
		success: "var(--success)",
		warning: "var(--warning)",
		danger: "var(--danger)",
		text: "var(--text)",
		"text-secondary": "var(--text-secondary)",
		"text-tertiary": "var(--text-tertiary)",
		"text-disabled": "var(--text-disabled)",
		bg: "var(--bg)",
		surface: "var(--surface)",
		divider: "var(--divider)",
		disabled: "var(--disabled)",
		gradient: "var(--gradient)",
	};
</script>

{#each Object.entries(colors) as [name, cssVar]}
	<div class="color-item">
		<div class="color-preview" style="background: {cssVar}"></div>
		<span class="color-name">{name}</span>
		<span class="color-value">{cssVar}</span>
	</div>
{/each}

<style>
	.color-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
	}
	.color-preview {
		width: 100%;
		height: 60px;
		border-radius: 6px;
		border: 1px solid #eee;
	}
	.color-name {
		font-weight: bold;
		font-size: 14px;
	}
	.color-value {
		font-family: monospace;
		font-size: 12px;
		color: #666;
	}
</style>
