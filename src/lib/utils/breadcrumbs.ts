// Базовый сегмент для всех employee-страниц
export type BreadcrumbItem = {
	title: string;
	href?: string;
};

const BASE = [{ title: "Главная", href: "#/employee" }];

// Статические страницы
export const EMPLOYEE_PAGES = {
	"/employee/goals": "Мои цели",
	"/employee/self-review": "Самооценка",
	"/employee/peer-review": "Оценка коллег",
	"/employee/result": "Результаты",
} as const;

// Генератор для статических страниц
export function employeeBreadcrumbs(pathname: string): BreadcrumbItem[] {
	const title = EMPLOYEE_PAGES[pathname as keyof typeof EMPLOYEE_PAGES];
	if (title) {
		return [...BASE, { title }];
	}
	return BASE; // для /employee
}

// Генератор для динамических страниц (цели)
export function goalBreadcrumbs(goalTitle: string): BreadcrumbItem[] {
	return [
		...BASE,
		{ title: "Мои цели", href: "#/employee/goals" },
		{ title: goalTitle },
	];
}
