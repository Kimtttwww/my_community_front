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
  category_no: number,
  board: string,
  category_name: string
}
