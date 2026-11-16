// Defining types
interface dateType {
	date: number;
	img?: string;
	text: string;
}

interface parsedDateType {
	id?: string;
	date: number;
	img?: string;
	text: string;
	x: number;
}

// Exporting types
export type { dateType, parsedDateType };
