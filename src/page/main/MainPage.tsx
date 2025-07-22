import css from "@/entity/main/ui/nav_bar.module.css";
import { getBoardList, getBoardNames } from "@/feature/board/api/boardGetApi";
import NaviBar from "@/shared/ui/NaviBar";
import MainList from "@/widget/main/ui/MainList";
import { Breadcrumbs, Link as MuiLink } from "@mui/material";
import NextLink from "next/link";
import { use } from "react";

export default function MainPage() {
	const boardNames = use(getBoardNames()).filter(({ board }) => board != 'qna' && board != 'faq');
	const boardLists = use(Promise.allSettled(boardNames.map(({ board }) => getBoardList(board, { perPage: 5 }))))
		.filter((req) => req.status == 'fulfilled')
		.map((result) => result.value.boards);

	return (<>
		{/* TODO 로그인 전, 후 ui 필요 */}
		<NaviBar />

		<div className="flex justifyContentCenter" style={{ height: '100px', alignItems: 'center' }}>
			<Breadcrumbs>
				{boardNames.map(({ board, subtitle }) => (<NextLink key={board} href={`/${board}`} className={`flex ${css.nav_title}`} style={{ cursor: 'pointer' }}>
					<MuiLink color="inherit" component="button" underline="hover">{subtitle || board}</MuiLink>
				</NextLink>))}
			</Breadcrumbs>
		</div>

		<div className="flex" style={{ flexWrap: "wrap", justifyContent: 'space-around' }}>
			{boardLists.map((boardList, i) => (<MainList key={boardNames[i].board} listName={boardNames[i]} listContent={boardList} domain={boardNames[i].board} />))}
		</div>
	</>);
}
