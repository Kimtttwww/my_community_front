import { getBoardList, getBoardNames } from "@/feature/board/api/boardGetApi";
import MainList from "@/widget/main/ui/MainList";
import NaviBar from "@/widget/main/ui/NaviBar";
import { use } from "react";

export default function MainPage() {
	const boardNames = use(getBoardNames()).filter(({ board }) => board != 'qna' && board != 'faq');
	const boardLists = use(Promise.allSettled(boardNames.map(({ board }) => getBoardList(board, { perPage: 5 }))))
		.filter((req) => req.status == 'fulfilled')
		.map((result) => result.value.boards);

	return (<>
		{/* TODO 로그인 전, 후 ui 필요 */}
		<NaviBar names={boardNames} />

		<div className="flex" style={{ flexWrap: "wrap", justifyContent: 'space-around' }}>
			{boardLists.map((boardList, i) => (<MainList key={boardNames[i].board} listName={boardNames[i]} listContent={boardList} domain={boardNames[i].board} />))}
		</div>
	</>);
}
