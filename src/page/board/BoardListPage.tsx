import { getBoardList, getBoardTitle } from "@/feature/board/api/boardGetApi";
import BoardList from "@/widget/board/ui/BoardList";

type ownProps = {
  domain: string,
};

export default async function BoardListPage({ domain }: ownProps) {
  const { boards, conut } = await getBoardList(domain);
  const title = await getBoardTitle(domain);

  return (<div className="flex justifyContentCenter" style={{ alignItems: 'center' }}>
    <div style={{ minWidth: '600px', minHeight: '750px', flexDirection: 'column', margin: '50px auto 0' }}>
      <h2 className="flex" style={{ marginBottom: '15px' }}>{title}</h2>

      <BoardList boards={boards} />

      {/* TODO 페이징  */}
    </div>
  </div>);
}
