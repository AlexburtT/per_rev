<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		open: boolean;
		title: string;
		onClose?: () => void;
		children?: Snippet<[]>;
		showCloseButton?: boolean;
	}

	const {
		open,
		title,
		onClose = () => {},
		children,
		showCloseButton = true,
	}: Props = $props();

	let dialogEl: HTMLDialogElement | null = null;

	// Управление открытием/закрытием через showModal() / close()
	$effect(() => {
		if (dialogEl) {
			if (open) {
				dialogEl.showModal?.(); // .showModal() — для модальных окон
			} else {
				dialogEl.close?.();
			}
		}
	});

	// Обработка нативного события закрытия (например, Esc)
	function handleDialogClose() {
		onClose();
	}

	// Закрытие по клику вне содержимого (на backdrop)
	function handleClickOutside(e: MouseEvent) {
		if (!dialogEl) return;
		const rect = dialogEl.getBoundingClientRect();
		const clickedInDialog =
			rect.left <= e.clientX &&
			e.clientX <= rect.right &&
			rect.top <= e.clientY &&
			e.clientY <= rect.bottom;

		if (!clickedInDialog) {
			onClose();
		}
	}
</script>

<dialog
	bind:this={dialogEl}
	onclose={handleDialogClose}
	onclick={handleClickOutside}
	class="modal"
>
	<header class="modal-header">
		<h2>{title}</h2>
		{#if showCloseButton}
			<button class="modal-close" onclick={onClose}>×</button>
		{/if}
	</header>

	<div class="modal-body">
		{#if children}
			{@render children()}
		{/if}
	</div>
</dialog>

<style>
	/* Стили для <dialog> */
	.modal {
		border: none;
		border-radius: 0.5rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
		width: 100%;
		max-width: 35rem;
		height: fit-content;
		overflow: hidden;
		background: var(--surface);
		color: var(--text);
		position: fixed;
		margin: 10rem auto;
		transition:
			display 0.3s allow-discrete,
			overlay 0.3s allow-discrete;

		animation: close 0.3s forwards;
		&[open] {
			animation: open 0.3s forwards;
		}

		&:not([open]) {
			animation: close 0.3s forwards;
		}
	}

	@keyframes open {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes close {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	/* Убираем стандартный backdrop (если нужно свой) */
	::backdrop {
		background: rgba(0, 0, 0, 0.6);
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 1.5rem;
		border-bottom: 1px solid var(--divider);
	}

	.modal-header h2 {
		margin: 0;
		font-size: 1.25rem;
	}

	.modal-close {
		background: none;
		border: none;
		font-size: 1.5rem;
		color: var(--text-tertiary);
		cursor: pointer;
		padding: 0.25rem;
		transition: color 0.2s;
	}

	.modal-close:hover {
		color: var(--danger);
	}

	.modal-body {
		padding: 1.5rem;
		overflow-y: auto;
		max-height: 70vh;
	}
</style>
