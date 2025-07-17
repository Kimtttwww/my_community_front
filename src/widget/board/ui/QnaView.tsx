'use client'

import { Board } from "@/entity/board/model/boardTypes";
import css from "@/entity/board/ui/viewPage.module.css";
import { getBoard } from "@/feature/board/api/boardGetApi";
import { Paper } from "@mui/material";
import { useEffect, useState } from "react";

type OwnProps = {
	QnaNo: number
};

export default function QnaView({ QnaNo }: OwnProps) {
	const [qna, setQna] = useState<Board>({} as Board);
	const [qnaReply, setQnaReply] = useState<{}[]>([]);

	useEffect(() => {
		getBoard('qna', QnaNo)
			.then((res) => setQna(res));
		// TODO 추가로 이 qna의 답변 로딩 필요
	}, [QnaNo]);

	return (<>
		<div className="flex" style={{ width: '100%', justifyContent: 'space-between', marginBottom: '20px' }}>
			<h3 className="ellipsis" style={{}}>{qna.title}</h3>
			<p>{qna.categoryNo || '일반'}</p>
			<p>{qna.created}</p>
		</div>
		<Paper variant="outlined" className={`${css.spacing}`} style={{ width: '100%', padding: '10px' }}>
			{/* 여기는 qna리스트에서 선택한 qna 정보가 보일 곳 */}
			{qna.content}
		</Paper>
	</>);
}
