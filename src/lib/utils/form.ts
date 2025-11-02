export const getFormData = <T extends Record<string, string>>(
	event: Event,
	validator?: (data: Partial<T>) => data is T
): T | undefined => {
	event.preventDefault();
	const form = event.target as HTMLFormElement;
	const data = Object.fromEntries(new FormData(form).entries()) as Partial<T>;

	if (validator && validator(data)) {
		return data;
	}

	return data as T; // ⚠️ Осторожно: это unsafe без валидатора
};

export const resetForm = (event: Event) => {
	(event.target as HTMLFormElement).reset();
};
