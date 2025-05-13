export type BoardNames = string[];
export type Board = {
  title: string,
  content: string,
  created: string,
  board_no: number,
  writer: string,
  status: boolean,
  category_no: number | null,
  views: number
};