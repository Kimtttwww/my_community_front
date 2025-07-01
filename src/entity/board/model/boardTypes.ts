export type BoardDomain = 'anonymous' | 'notice' | 'gallery' | string;

export type BoardName = {
	board: BoardDomain
	subtitle?: string
};

export type Board = {
	boardNo: number,
	board: BoardDomain
	/**
	 * 일반적으로 string, 익명글인 경우 number
	 */
	writer: string | number,
	/**
	 * 0: 기본, 나머진 각 게시판 별 값 다름, undefined는 초기값 오류일 것으로 추정 -> 기본처리
	 */
	categoryNo: number | undefined,
	created: string,
	status: boolean,
	title: string,
	content: string,
	views: number
};

export type Category = {
	categoryNo: number,
	board: BoardDomain,
	categoryName: string
} | undefined;

export type BoardSearchOption = {
	perPage?: number,
	currentPage?: number
};
