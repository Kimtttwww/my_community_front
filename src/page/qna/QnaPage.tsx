import { getBoardList } from "@/feature/board/api/boardGetApi";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { use } from "react";

export default function QnaPage() {
	const qnaList = use(getBoardList('qna'));

	return (<section className="flex justifyContentCenter" style={{ height: '100vh', padding: '50px 30px' }}>
		{/* TODO qna 목록 절반, 작성 절반(메일 느낌으로, 200개씩 조회, 스크롤위주 + 페이징 최소) */}
		<article className="flex flexDirectionColumn" style={{ width: '40%', minHeight: '100%', alignItems: 'center', overflowY: 'auto', border: '1px solid #e0e0e0' }}>
			<Table>
				{qnaList && qnaList.count && (<TableHead>
					<TableRow>
						<TableCell>제목</TableCell>
						<TableCell>등록일</TableCell>
						<TableCell>답변여부</TableCell>
					</TableRow>
				</TableHead>)}
				<TableBody>
					{qnaList && qnaList.count ? <>{qnaList.boards.map((qna) => (
						<TableRow key={qna.boardNo}>
							<TableCell key={qna.boardNo + 'title'}>{qna.title}</TableCell>
							<TableCell key={qna.boardNo + 'created'}>{qna.created}</TableCell>
							<TableCell key={qna.boardNo + 'answer'}>{qna.views}{/* TODO 여기는 답변 여부 */}</TableCell>
						</TableRow>))
					}</> : <div className="flex justifyContentCenter" style={{ height: '100%', alignItems: 'center' }}>Q&A 접수 내역이 없습니다</div>}
				</TableBody>
			</Table>
		</article>
		<article className="flex flexDirectionColumn justifyContentCenter" style={{ width: '60%', minHeight: '100%', alignItems: 'center', border: '1px solid #e0e0e0' }}>
			여기는 qna리스트에서 선택한 qna 정보가 보일 곳
		</article>
	</section >);
}
