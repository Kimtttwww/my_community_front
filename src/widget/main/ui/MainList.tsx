'use client'

import { Board, BoardDomain, BoardName } from "@/entity/board/model/boardTypes";
import css from "@/entity/main/ui/list.module.css";
import useReplaceWriter from "@/shared/lib/useReplaceWriter";
import Link from "next/link";
import { useRouter } from "next/navigation";

type OwnProps = {
	listName: BoardName,
	listContent: Board[],
	domain: BoardDomain
}

export default function MainList({ listName, listContent, domain }: OwnProps) {
	const navi = useRouter();
	const { getWriterNickname, setWriter } = useReplaceWriter();

	return (
		<section className="flex" style={{ width: '560px', minHeight: '100px', flexDirection: 'column', margin: '15px 5px', padding: '5px' }}>
			<Link href={`/${listName.board}`} style={{ fontSize: 'x-large', fontWeight: "bold", textTransform: 'uppercase', marginBottom: '15px' }}>{listName.subtitle || listName.board}</Link>
			<section className="flex" style={{ flexDirection: 'column' }}>
				{listContent.map((board) => {
					let writer: any = board.writer;
					if (domain === 'anonymous') {
						setWriter(board.writer as number);
						writer = getWriterNickname(board.writer as number);
					}
					return (
						<article key={board.boardNo} className={`flex ${css.list_item}`} onClick={() => navi.push(`/${listName.board}/${board.boardNo}`)}>
							<p style={{ width: '65%' }}>{board.title}</p>
							<p className={`flex`}>{writer}</p>
							<p className={`flex`}>{board.created.replaceAll('-', '. ')}</p>
						</article>
					);
				})}
			</section>
		</section>
	)
}
