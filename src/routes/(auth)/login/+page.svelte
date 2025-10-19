<script lang="ts">
	import { fade } from "svelte/transition";

	let visible = $state(false);

	setTimeout(() => {
		visible = true;
	}, 200);

	//let { data } = $props();
</script>

<svelte:head>
	<title>Вход</title>
</svelte:head>

{#if visible}
	<form transition:fade method="POST">
		<label>
			Email
			<input name="email" type="email" />
		</label>
		<label>
			Password
			<input name="password" type="password" />
		</label>
		<button>Log in</button>
	</form>
{/if}
