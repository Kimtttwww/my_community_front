export type BoardName = {
	board: string
	subtitle?: string
};

export type Board = {
	title: string,
	content: string,
	created: string,
	boardNo: number,
	writer: string,
	status: boolean,
	categoryNo: number | undefined,
	views: number
};

export type Category = {
	categoryNo: number,
	board: string,
	categoryName: string
} | undefined;

export type BoardSearchOption = {
	perPage?: number,
	currentPage?: number
};
