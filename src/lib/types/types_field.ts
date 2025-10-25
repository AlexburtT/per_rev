// types.ts
export type InputField = {
	type: "input";
	name: string;
	label?: string;
	placeholder?: string;
};

export type SelectField = {
	type: "select";
	name: string;
	label?: string;
	options: { value: string; label: string }[];
};

export type ButtonField = {
	type: "button";
	text: string;
	name?: string;
};

export type Field = InputField | SelectField | ButtonField;
