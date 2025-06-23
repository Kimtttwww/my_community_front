import { getBoardList, getBoardTitle } from "@/feature/board/api/boardGetApi";
import BoardList from "@/widget/board/ui/BoardList";
import { Pagination } from "@mui/material";

type ownProps = {
	domain: string,
	searchParams: {
		perPage?: string,
		currentPage?: string
	}
};

export default async function BoardListPage({ domain, searchParams }: ownProps) {
	const { boards, count } = await getBoardList(domain);
	const title = await getBoardTitle(domain);

	return (<div className="flex justifyContentCenter" style={{ alignItems: 'center' }}>
		<div style={{ minWidth: '600px', minHeight: '750px', flexDirection: 'column', margin: '50px auto 0' }}>
			<h2 className="flex" style={{ marginBottom: '15px' }}>{title}</h2>

			<BoardList boards={boards} />

			{/* TODO 페이지 클릭시 조건 적용 후 조회 필요 */}
			<Pagination defaultPage={Number(searchParams?.currentPage) || 1} count={Math.ceil(count / (Number(searchParams?.perPage) || 10))} boundaryCount={5} style={{ justifySelf: 'center', marginTop: '30px' }} />

			{/* TODO 작성 페이지 이동 ui 필요 */}
		</div>
	</div>);
}
