export function updateField<
	T extends Record<string, any>,
	K extends keyof T = keyof T
>(state: T, name: string, value: any): void {
	if (name in state) {
		state[name as K] = value;
	}
}
