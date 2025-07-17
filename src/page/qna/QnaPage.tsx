'use client'

import { Board } from "@/entity/board/model/boardTypes";
import { getBoardList } from "@/feature/board/api/boardGetApi";
import QnaView from "@/widget/board/ui/QnaView";
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";

export default function QnaPage() {
	const [qnaList, setQnaList] = useState<Board[]>([]);
	const [targetQna, setTargetQna] = useState<number>();

	useEffect(() => {
		getBoardList('qna')
			.then((res) => setQnaList(res.boards));
	}, []);

	return (<section className="flex justifyContentCenter" style={{ height: '100vh', padding: '50px 30px' }}>
		{/* TODO qna 목록 절반, 작성 절반(메일 느낌으로, 200개씩 조회, 스크롤위주 + 페이징 최소) */}
		<Paper variant="outlined" square className="flex flexDirectionColumn" style={{ width: '40%', minHeight: '100%', alignItems: 'center', overflowY: 'auto' }}>
			<Table>
				{qnaList.length > 0 && (<TableHead><TableRow>
					<TableCell>제목</TableCell>
					<TableCell>등록일</TableCell>
					<TableCell>답변여부</TableCell>
				</TableRow></TableHead>)}
				<TableBody>
					{qnaList.length > 0 ? qnaList.map((qna) => (
						<TableRow key={qna.boardNo} onClick={() => setTargetQna(qna.boardNo)} hover selected={qna.boardNo === targetQna}>
							<TableCell key={qna.boardNo + 'title'}>{qna.title}</TableCell>
							<TableCell key={qna.boardNo + 'created'}>{qna.created}</TableCell>
							<TableCell key={qna.boardNo + 'answer'}>{qna.views}{/* TODO 여기는 답변 여부 */}</TableCell>
						</TableRow>)) : <div className="flex justifyContentCenter" style={{ height: '100%', alignItems: 'center' }}>Q&A 접수 내역이 없습니다</div>}
				</TableBody>
			</Table>
		</Paper>
		<Paper variant="outlined" square className="flex flexDirectionColumn" style={{ width: '60%', minHeight: '100%', alignItems: 'center', padding: '10px' }}>
			{targetQna ? <QnaView QnaNo={targetQna || 0} /> : <div className="flex" style={{ height: '100%', alignItems: 'center' }}>선택된 Q&A가 없습니다.</div>}
		</Paper>
	</section>);
}
