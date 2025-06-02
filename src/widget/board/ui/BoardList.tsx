'use client'

import { Board } from "@/entity/board/model/boardTypes";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useRouter } from "next/navigation";

type ownProps = {
  boards: Board[]
}

export default function BoardList({ boards }: ownProps) {
  const nav = useRouter();
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
          return (
            // TODO 해당 게시글로 이동을 위한 경로 설정 필요
            <TableRow key={'bno_' + board.boardNo} onClick={() => nav.push(`/${board}/${board.boardNo}`)}>
              <TableCell key={'title_' + board.boardNo} component={'th'}>{board.title}</TableCell>
              <TableCell key={'writer_' + board.boardNo} align="center">{board.writer}</TableCell>
              <TableCell key={'created_' + board.boardNo} align="center">{board.created}</TableCell>
              <TableCell key={'views_' + board.boardNo} align="center">{board.views}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
