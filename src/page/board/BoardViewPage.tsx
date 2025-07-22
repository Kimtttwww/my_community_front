import { BoardDomain } from "@/entity/board/model/boardTypes";
import css from "@/entity/board/ui/viewPage.module.css";
import { getBoard, getBoardTitle, getCategoryList } from "@/feature/board/api/boardGetApi";
import NaviBar from "@/shared/ui/NaviBar";
import { use } from "react";

type OwnProps = {
	domain: BoardDomain,
	boardNo: string
};

export default function BoardViewPage({ domain, boardNo }: OwnProps) {
	const board = use(getBoard(domain, Number(boardNo)));
	const title = use(getBoardTitle(domain));
	const categorys = use(getCategoryList(domain));

	function selectCategory() {
		const categoryName = categorys.find((category) => category?.categoryNo === board.categoryNo)?.categoryName;
		return domain === 'notice' ? '공지' : board.categoryNo ? categoryName : '일반';
	}

	return (<>
		<NaviBar />
		<div className="flex flexDirectionColumn" style={{ width: '1000px', minHeight: '600px', margin: '20px auto 0' }}>
			<h1 className={`flex ${css.spacing}`} style={{ textTransform: 'uppercase' }}>{title}</h1>
			<hr className={`${css.spacing}`} style={{ borderColor: 'gray' }} />

			<section className={`flex flexDirectionColumn ${css.spacing}`} style={{ padding: '3px 0' }}>
				<article><b>[{selectCategory()}]&nbsp;&nbsp;{board?.title}</b></article>
				<article>{board?.writer}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{board?.created}</article>
			</section>
			<hr className={`${css.spacing}`} style={{ borderColor: 'lightgray' }} />

			<div style={{ paddingTop: '10px' }}>{board?.content}</div>
		</div>
	</>);
}
