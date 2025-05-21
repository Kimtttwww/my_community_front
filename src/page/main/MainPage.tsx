import { getBoardList, getBoardNames } from "@/feature/board/api/boardGetApi";
import MainList from "@/widget/main/ui/MainList";
import NaviBar from "@/widget/main/ui/NaviBar";

export default async function MainPage() {
  const boardNames = (await getBoardNames()).filter(({ board }) => board != 'qna' && board != 'faq');
  const boardTitle = boardNames.map(({ board, subtitle }) => subtitle || board)

  const boardLists = (await Promise.allSettled(boardNames.map(({ board }) => getBoardList(board))))
    .filter((req) => req.status == 'fulfilled')
    .map((result) => result.value.boards)

  return (<>
    <NaviBar navs={boardTitle} />

    <div className="flex" style={{ flexWrap: "wrap", justifyContent: 'space-around' }}>
      {boardLists.map((boardList, i) => (<MainList key={boardTitle[i]} listName={boardTitle[i]} listContent={boardList} />
      ))}
    </div>
  </>);
}
