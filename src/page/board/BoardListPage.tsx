import { getBoardList } from "@/feature/board/api/boardGetApi";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

type ownProps = {
  domain: string,
};

export default async function BoardListPage({ domain }: ownProps) {
  const { boards, conut } = await getBoardList(domain);

  return (<div className="flex" style={{ justifyContent: 'center', alignItems: 'center' }}>
    <div style={{ minWidth: '600px', minHeight: '750px', flexDirection: 'column', margin: '50px auto 0' }}>
      <h2 className="flex">방제</h2>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">제목</TableCell>
            <TableCell align="center">작성자</TableCell>
            <TableCell align="center">작성일</TableCell>
            <TableCell align="center">조회수</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {boards?.map((board) => {
            return (
              <TableRow key={'bno_' + board.board_no}>
                <TableCell key={'title_' + board.board_no}>{board.title}</TableCell>
                <TableCell key={'writer_' + board.board_no} align="center">{board.writer}</TableCell>
                <TableCell key={'created_' + board.board_no} align="center">{board.created}</TableCell>
                <TableCell key={'views_' + board.board_no} align="center">{board.views}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  </div>);
}
