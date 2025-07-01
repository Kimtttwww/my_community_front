'use client'

import { Board, BoardDomain } from "@/entity/board/model/boardTypes";
import useReplaceWriter from "@/shared/lib/useReplaceWriter";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

type OwnProps = {
	boards: Board[],
	domain: BoardDomain
}

export default function BoardList({ boards, domain }: OwnProps) {
	const pathName = usePathname();
	const nav = useRouter();
	const { getWriterNickname, setWriter } = useReplaceWriter();

	// TODO 익명 글 작성자 처리 필요
	return (
		<Table style={{ borderTop: '2px solid black' }}>
			<TableHead>
				<TableRow>
					<TableCell align="center">제목</TableCell>
					<TableCell align="center">작성자</TableCell>
					<TableCell align="center">작성일</TableCell>
					<TableCell align="center">조회수</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{boards.map((board) => {
					let writer: any = board.writer;
					if (domain === 'anonymous') {
						setWriter(board.writer as number);
						writer = getWriterNickname(board.writer as number);
					}
					return (
						<TableRow key={'bno_' + board.boardNo} onClick={() => nav.push(`${pathName}/${board.boardNo}`)}>
							<TableCell key={'title_' + board.boardNo} component={'th'}>{board.title}</TableCell>
							<TableCell key={'writer_' + board.boardNo} align="center">{writer || '부존재의 증명'}</TableCell>
							<TableCell key={'created_' + board.boardNo} align="center">{board.created}</TableCell>
							<TableCell key={'views_' + board.boardNo} align="center">{board.views}</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}
