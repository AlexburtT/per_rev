<script lang="ts">
	import { setTheme, theme } from "$lib/stores/theme.store";

	function toggleTheme() {
		setTheme($theme === "light" ? "dark" : "light");
	}
</script>

<button
	class="theme-toggle"
	onclick={toggleTheme}
	aria-label="Переключить тему"
>
	{#if $theme === "light"}
		<span class="theme-icon">☀️</span>
	{:else}
		<span class="theme-icon">🌙</span>
	{/if}
</button>

<style>
	.theme-toggle {
		position: fixed;
		top: 1rem;
		right: 1rem;
		background: var(--pr-primary, oklch(0.25 0.02 216));
		border: none;
		border-radius: 50%;
		width: 3rem;
		height: 3rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-text, oklch(0.5 0.1 240));
		transition: all 0.3s ease;
		z-index: 9999;
	}

	.theme-toggle:hover {
		background: var(--color-button-hover, oklch(0.7 0.05 240));
		transform: scale(1.1);
	}

	.theme-icon {
		font-size: 1.2rem;
	}

	/* Адаптивное позиционирование для экранов > 1200px */
	@media (min-width: 1200px) {
		.theme-toggle {
			position: absolute;
			top: 1rem;
			right: calc((100vw - 1200px) / 2 + 1rem);
			/* Или можно использовать более точное позиционирование: */
			/* right: calc((100vw - var(--lm-container-max-width)) / 2 + 1rem); */
		}
	}

	/* Для очень широких экранов */
	@media (min-width: 1400px) {
		.theme-toggle {
			right: calc((100vw - 1200px) / 2 + 1rem);
		}
	}

	@media print {
		.theme-toggle {
			display: none;
		}
	}
</style>
