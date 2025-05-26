'use client'

import { Board, BoardName } from "@/entity/board/type/BoardTypes";
import css from "@/entity/main/css/list.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ownProps = {
  listName: BoardName;
  listContent: Board[];
}

export default function MainList({ listName, listContent }: ownProps) {
  const navi = useRouter();

  // TODO 익명 글 작성자 처리 필요
  return (
    <section className="flex" style={{ width: '560px', minHeight: '100px', flexDirection: 'column', margin: '15px 5px', padding: '5px' }}>
      <Link href={`/${listName.board}`} style={{ fontSize: 'x-large', fontWeight: "bold", textTransform: 'uppercase', marginBottom: '15px' }}>{listName.subtitle || listName.board}</Link>
      <section className="flex" style={{ flexDirection: 'column' }}>
        {listContent.map((board) => (
          <article key={board.boardNo} className={`flex ${css.list_item}`} onClick={() => navi.push(`/${listName.board}/${board.boardNo}`)}>
            <p style={{ width: '65%' }}>{board.title}</p>
            <p className={`flex`}>{board.writer}</p>
            <p className={`flex`}>{board.created.replaceAll('-', '. ')}</p>
          </article>
        ))}
      </section>
    </section>
  )
}
