<script>
	export let status;
	export let error;
</script>

<div style="padding: 2rem; text-align: center;">
	<h1>{status ? `Ошибка ${status}` : "Что-то пошло не так"}</h1>
	<p>{error?.message || "Попробуйте позже"}</p>
	<a
		href="#/"
		style="display: inline-block; margin-top: 1rem; color: #007bff;"
		>← Вернуться</a
	>
</div>
