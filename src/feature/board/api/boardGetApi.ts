'use server'

import { BoardAPI } from "@/entity/board/path/BoardAPI";
import { Board, BoardName, Category } from "@/entity/board/type/BoardTypes";
import axios from "axios";

type getBoardListResult = {
  conut: number,
  boards: Board[];
}

export async function getBoardNames(): Promise<BoardName[]> {
  const res = await axios.get(BoardAPI.BOARD_NAMES);
  return res?.data;
}

export async function getBoardList(domain: string): Promise<getBoardListResult> {
  const res = await axios.get(BoardAPI.BOARD_LIST(domain));
  return res?.data;
}

export async function getBoard(domain: string, boardNo: number): Promise<Board> {
  const res = await axios.get(BoardAPI.BOARD(domain, boardNo));
  return res?.data;
}

export async function getBoardTitle(domain: string): Promise<string> {
  const res = await axios.get(BoardAPI.BOARD_TITLE(domain));
  return res?.data.subtitle || res?.data.board;
}

export async function getCategoryList(domain: string): Promise<Category[]> {
  const res = await axios.get(BoardAPI.CATEGORY_LIST(domain));
  return res?.data;
}
