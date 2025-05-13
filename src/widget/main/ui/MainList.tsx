import { Board } from "@/entity/board/type/BoardTypes";
import css from "@/entity/main/css/list.module.css";
import Link from "next/link";

type ownProps = {
  listName?: string;
  listContent: Board[];
}

export default function MainList({ listName, listContent }: ownProps) {
  listName = listName ?? '공지사항';

  return (  // TODO 변수 적용 필요
    <section className="flex" style={{ width: '560px', minHeight: '100px', flexDirection: 'column', margin: '20px 5px', padding: '5px' }}>
      <Link href={''} style={{ fontSize: 'x-large', fontWeight: "bold", marginBottom: '15px' }}>{listName}</Link>
      <section className="flex" style={{ flexDirection: 'column' }}>
        {listContent?.map((board) => (
          <article key={board.board_no} className={`flex ${css.list_item}`}>
            <p style={{ width: '65%' }}>{board.title}</p>
            <p className={`flex`}>{board.writer}</p>
            <p className={`flex`}>{board.created}</p>
          </article>
        ))}
      </section>
    </section>
  )
}
