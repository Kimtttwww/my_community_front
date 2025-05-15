import { getBoard } from "@/feature/board/api/boardGetApi";

type ownProps = {
  domain: string,
  boardNo: string
};

export default function BoardViewPage({ domain, boardNo }: ownProps) {

  getBoard(domain, Number(boardNo)).then((board) => {
    console.log(board);
  }).catch((msg) => {
    console.log(msg);
  });

  return (<div></div>);
}