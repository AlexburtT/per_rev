// src/lib/utils/date.ts

export function formatDate(dateStr: string): string {
	return new Date(dateStr).toLocaleDateString("ru-RU", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});
}

// Дополнительно: можно добавить форматирование времени или относительных дат
export function formatDateTime(dateStr: string): string {
	return new Date(dateStr).toLocaleString("ru-RU", {
		day: "2-digit",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
}
