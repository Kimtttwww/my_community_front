'use server'

import { BoardPath } from "@/entity/board/model/BoardPath";
import { Board, BoardName, BoardSearchOption, Category } from "@/entity/board/model/boardTypes";
import axios from "axios";

type getBoardListResult = {
	count: number,
	boards: Board[];
}

export async function getBoardNames(): Promise<BoardName[]> {
	const res = await axios.get(BoardPath.BOARD_NAMES);
	return res?.data;
}

export async function getBoardList(domain: string, searchOption?: BoardSearchOption): Promise<getBoardListResult> {
	const searchOptionWrapper = searchOption ? new URLSearchParams(Object.entries(searchOption).map((value) => [value[0], String(value[1])])) : null;
	const res = await axios.get(BoardPath.BOARD_LIST(domain) + (searchOptionWrapper ? '?' + searchOptionWrapper.toString() : ''));
	return res?.data;
}

export async function getBoard(domain: string, boardNo: number): Promise<Board> {
	const res = await axios.get(BoardPath.BOARD(domain, boardNo));
	return res?.data;
}

export async function getBoardTitle(domain: string): Promise<string> {
	const res = await axios.get(BoardPath.BOARD_TITLE(domain));
	return res?.data.subtitle || res?.data.board;
}

export async function getCategoryList(domain: string): Promise<Category[]> {
	const res = await axios.get(BoardPath.CATEGORY_LIST(domain));
	return res?.data;
}
