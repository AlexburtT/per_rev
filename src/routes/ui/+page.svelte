<script lang="ts">
	import Button from "$lib/components/ui/Button.svelte";
	import Input from "$lib/components/ui/Input.svelte";
	import Select from "$lib/components/ui/Select.svelte";
	import Color from "$lib/components/ui/Color.svelte";
	import { iconMap } from "$lib/components/icons/iconMap";
</script>

<h1>Компоненты UI</h1>
<div>
	<p>Кнопки</p>
	<div class="palette">
		<Button title="Primary" />
		<Button title="Outline" variant="outline" />
		<Button title="Secondary" variant="secondary" />
		<Button title="Disabled" disabled />
	</div>
</div>

<div>
	<p>Поле ввода</p>
	<div class="palette">
		<Input name="example" label="Имя" placeholder="Введите имя" />
	</div>
</div>

<div>
	<p>Выпадающий список</p>
	<Select
		name="role"
		label="Роль"
		options={[
			{ value: "user", label: "Пользователь" },
			{ value: "admin", label: "Админ" },
		]}
	/>
</div>

<div>
	<p>Цвета</p>
	<div class="palette">
		<Color />
	</div>
</div>

<div>
	<p>Иконки</p>
	{#each Object.entries(iconMap) as [name, IconComponent]}
		<div style="display: inline-block; margin: 8px; text-align: center;">
			<IconComponent />
			<div>{name}</div>
		</div>
	{/each}
</div>

<style>
	.palette {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 16px;
		padding: 24px;
	}
</style>
