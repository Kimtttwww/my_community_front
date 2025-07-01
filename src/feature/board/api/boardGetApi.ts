'use server'

import { BoardPath } from "@/entity/board/model/BoardPath";
import { Board, BoardDomain, BoardName, BoardSearchOption, Category } from "@/entity/board/model/boardTypes";
import axios from "axios";

type getBoardListResult = {
	count: number,
	boards: Board[];
}

export async function getBoardNames(): Promise<BoardName[]> {
	const res = await axios.get(BoardPath.BOARD_NAMES);
	return res?.data;
}

export async function getBoardList(domain: BoardDomain, searchOption: BoardSearchOption | URLSearchParams = new URLSearchParams()): Promise<getBoardListResult> {
	const searchOptionWrapper = searchOption instanceof URLSearchParams ? searchOption : new URLSearchParams(Object.entries(searchOption).map((value) => [value[0], String(value[1])]));
	const res = await axios.get(BoardPath.BOARD_LIST(domain) + ('?' + searchOptionWrapper.toString()));
	return res?.data;
}

export async function getBoard(domain: BoardDomain, boardNo: number): Promise<Board> {
	const res = await axios.get(BoardPath.BOARD(domain, boardNo));
	return res?.data;
}

export async function getBoardTitle(domain: BoardDomain): Promise<string> {
	const res = await axios.get(BoardPath.BOARD_TITLE(domain));
	return res?.data.subtitle || res?.data.board;
}

export async function getCategoryList(domain: BoardDomain): Promise<Category[]> {
	const res = await axios.get(BoardPath.CATEGORY_LIST(domain));
	return res?.data;
}
