'use server'

import { BoardAPI } from "@/entity/board/path/BoardAPI";
import { Board, BoardNames } from "@/entity/board/type/BoardTypes";
import axios from "axios";

type getBoardListResult = {
  conut: number,
  boards: Board[];
}

export async function getBoardNames(): Promise<BoardNames> {
  const res = await axios.get(BoardAPI.BOARD_NAMES);
  return res?.data;
}

export async function getBoardList(domain: string): Promise<getBoardListResult> {
  const res = await axios.get(BoardAPI.HOST + '/' + domain + '/');
  return res?.data;
}

export async function getBoard(domain: string, boardNo: number): Promise<Board> {
  const res = await axios.get(BoardAPI.HOST + '/' + domain + '/' + boardNo);
  return res?.data;
}
