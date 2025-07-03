import { BoardDomain } from "@/entity/board/model/boardTypes";
import css from "@/entity/board/ui/viewPage.module.css";
import { getBoard, getBoardTitle, getCategoryList } from "@/feature/board/api/boardGetApi";

type OwnProps = {
	domain: BoardDomain,
	boardNo: string
};

export default async function BoardViewPage({ domain, boardNo }: OwnProps) {
	const board = await getBoard(domain, Number(boardNo));
	const title = await getBoardTitle(domain);
	const categorys = await getCategoryList(domain);

	function selectCategory() {
		const categoryName = categorys.find((category) => category?.categoryNo === board.categoryNo)?.categoryName;
		return domain === 'notice' ? '공지' : board.categoryNo ? categoryName : '일반';
	}

	return (<div className="flex" style={{ width: '1000px', minHeight: '600px', flexDirection: 'column', margin: '0 auto', marginTop: '50px' }}>
		<h1 className={`flex ${css.spacing}`} style={{ textTransform: 'uppercase' }}>{title}</h1>
		<hr className={`${css.spacing}`} style={{ borderColor: 'gray' }} />

		<section className={`flex ${css.spacing}`} style={{ flexDirection: 'column', padding: '3px 0' }}>
			<article><b>[{selectCategory()}]&nbsp;&nbsp;{board?.title}</b></article>
			<article>{board?.writer}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{board?.created}</article>
		</section>
		<hr className={`${css.spacing}`} style={{ borderColor: 'lightgray' }} />

		<div style={{ paddingTop: '10px' }}>{board?.content}</div>
	</div>);
}
