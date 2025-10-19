import { writable } from "svelte/store";

export type Theme = "light" | "dark";

export const theme = writable<Theme>("light");

// Изменение темы
export function setTheme(newTheme: Theme) {
	theme.set(newTheme);
}

// Инициализация темы при загрузке
if (typeof window !== "undefined") {
	const isDarkMode = window.matchMedia(
		"(prefers-color-scheme: dark)"
	).matches;
	const initialTheme: Theme = isDarkMode ? "dark" : "light";
	setTheme(initialTheme);

	// Обновление темы при изменении системного режима
	theme.subscribe((newTheme) => {
		document.documentElement.setAttribute("data-theme", newTheme);
	});

	const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
	const handleMediaChange = (e: MediaQueryListEvent) => {
		setTheme(e.matches ? "dark" : "light");
	};

	mediaQuery.addEventListener("change", handleMediaChange);
}
