<script lang="ts">
	import Button from "$lib/components/ui/Button.svelte";
	import Input from "$lib/components/ui/Input.svelte";
	import Select from "$lib/components/ui/Select.svelte";
	import Color from "$lib/components/ui/Color.svelte";
	import { iconMap } from "$lib/components/icons/iconMap";
	import Checkbox from "$lib/components/ui/Checkbox.svelte";
</script>

<h1>Компоненты UI</h1>
<br />
<div>
	<strong>Кнопки</strong>
	<div class="palette">
		<Button title="Primary" />
		<Button title="Outline" variant="outline" />
		<Button title="Secondary" variant="secondary" />
		<Button title="Disabled" disabled />
	</div>
</div>

<div>
	<strong>Поле ввода</strong>
	<div class="palette">
		<Input name="name" label="Имя" type="text" required />
		<Input name="email" label="Email" type="email" />
		<Input name="tel" label="Disabled" type="number" disabled />
		<Input name="birthday" label="Дата рождения" type="date" />
		<Input name="bio" label="О себе" type="textarea" rows={5} />
	</div>
</div>

<div>
	<strong>Выпадающий список и чекбоксы</strong>
	<div class="palette">
		<Select
			name="role"
			label="Задачи"
			options={[
				{
					value: "task",
					label: "Создать универсальный компонент Input",
				},
				{
					value: "task2",
					label: "Создать в layoute хлебные крошики Breadcroums",
				},
				{
					value: "task3",
					label: "Создать интерфейс подключения и хранения к IndexedDB",
				},
			]}
		/>

		<Checkbox name="test" label="Согласен" required />
		<Checkbox name="test" label="Задача № 1" checked />
		<Checkbox name="test2" label="Задача № 2" checked disabled />
	</div>
</div>

<div>
	<strong>Цвета</strong>
	<div class="palette">
		<Color />
	</div>
</div>

<div>
	<strong>Иконки</strong>
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

	strong {
		display: block;
		border-bottom: 1px solid var(--text-disabled);
		padding-bottom: 0.2rem;
	}
</style>
