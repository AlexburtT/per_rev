<script lang="ts">
	import { fade } from "svelte/transition";

	let visible = $state(false);

	setTimeout(() => {
		visible = true;
	}, 200);
</script>

{#if visible}
	<h1 transition:fade>Страница сотрудника с задачами</h1>
{/if}
