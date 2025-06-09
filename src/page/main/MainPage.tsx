import { getBoardList, getBoardNames } from "@/feature/board/api/boardGetApi";
import MainList from "@/widget/main/ui/MainList";
import NaviBar from "@/widget/main/ui/NaviBar";

export default async function MainPage() {
	const boardNames = (await getBoardNames()).filter(({ board }) => board != 'qna' && board != 'faq');

	const boardLists = (await Promise.allSettled(boardNames.map(({ board }) => getBoardList(board))))
		.filter((req) => req.status == 'fulfilled')
		.map((result) => result.value.boards)

	return (<>
		{/* TODO 로그인 전, 후 ui 필요 */}
		<NaviBar names={boardNames} />

		<div className="flex" style={{ flexWrap: "wrap", justifyContent: 'space-around' }}>
			{boardLists.map((boardList, i) => (<MainList key={boardNames[i].board} listName={boardNames[i]} listContent={boardList} />))}
		</div>
	</>);
}
