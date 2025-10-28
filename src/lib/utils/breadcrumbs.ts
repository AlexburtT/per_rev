// Базовый сегмент для всех employee-страниц
const BASE = [{ title: "Главная", href: "/employee" }];

// Статические страницы
export const EMPLOYEE_PAGES = {
	"/employee/goals": "Цели и задачи",
	"/employee/self-review": "Самооценка",
	"/employee/peer-review": "Оценка коллег",
	"/employee/result": "Результаты",
} as const;

// Генератор для статических страниц
export function employeeBreadcrumbs(pathname: string) {
	const title = EMPLOYEE_PAGES[pathname as keyof typeof EMPLOYEE_PAGES];
	if (title) {
		return [...BASE, { title }];
	}
	return BASE; // для /employee
}

// Генератор для динамических страниц (цели)
export function goalBreadcrumbs(goalTitle: string) {
	return [
		...BASE,
		{ title: "Цели", href: "/employee/goals" },
		{ title: goalTitle },
	];
}
