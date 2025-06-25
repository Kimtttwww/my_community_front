import { getBoardList, getBoardTitle } from "@/feature/board/api/boardGetApi";
import InteractivePagination from "@/shared/ui/InteractivePagination";
import BoardList from "@/widget/board/ui/BoardList";

type ownProps = {
	domain: string,
	searchParams: {
		perPage?: string,
		currentPage?: string
	}
};

export default async function BoardListPage({ domain, searchParams }: ownProps) {
	const { boards, count } = await getBoardList(domain, { currentPage: Number(searchParams.currentPage) || 1 });
	const title = await getBoardTitle(domain);

	return (<div className="flex justifyContentCenter" style={{ alignItems: 'center' }}>
		<div style={{ minWidth: '600px', minHeight: '750px', flexDirection: 'column', margin: '50px auto 0' }}>
			<h2 className="flex" style={{ marginBottom: '15px' }}>{title}</h2>

			<BoardList boards={boards} />

			<InteractivePagination allCount={count} />

			{/* TODO 작성 페이지 이동 ui 필요 */}
		</div>
	</div>);
}
