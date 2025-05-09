'use server'

import { BoardAPI } from "@/entity/board/path/BoardAPI";
import { BoardNames } from "@/entity/board/type/BoardTypes";
import axios from "axios";

export async function getBoardNames(): Promise<BoardNames> {
  const res = await axios.get(BoardAPI.BOARD_NAMES);
  console.log(res.data);
  return res.data;
}