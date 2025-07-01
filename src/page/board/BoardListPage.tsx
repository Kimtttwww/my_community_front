'use client'

import { Board } from "@/entity/board/model/boardTypes";
import { getBoardList, getBoardTitle } from "@/feature/board/api/boardGetApi";
import { combineURLSearchParams } from "@/shared/lib/searchParamsUtils";
import InteractivePagination from "@/shared/ui/InteractivePagination";
import BoardList from "@/widget/board/ui/BoardList";
import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BoardListPage() {
	const { domain } = useParams();
	const searchParams = useSearchParams();
	const [boards, setBoards] = useState<Board[]>([]);
	const [count, setCount] = useState<number>(0);
	const [title, setTitle] = useState<string>(domain as string);
	const [perPage] = useState<number>(Number(searchParams.get('perPage')) || 10);
	const nav = useRouter();

	useEffect(() => {
		getBoardTitle(domain as string)
			.then((title) => setTitle(title));
	}, []);

	useEffect(() => {
		getBoardList(domain as string, searchParams)
			.then(({ boards, count }) => {
				setBoards(boards);
				setCount(count);
			});
	}, [searchParams]);

	function handleChange(e: SelectChangeEvent) {
		const url = combineURLSearchParams(searchParams, { perPage: e.target.value, currentPage: 1 })
		nav.push('?' + url.toString());
	}

	return (<div className="flex justifyContentCenter" style={{ alignItems: 'center' }}>
		<div style={{ minWidth: '600px', minHeight: '750px', flexDirection: 'column', margin: '50px auto 0' }}>
			<section className="flex" style={{ justifyContent: 'space-between' }}>
				<h2 className="flex" style={{ marginBottom: '15px' }}>{title}</h2>

				{/* TODO 카테고리와 검색어를 받는 검색창 추가 필요 */}

				<article>
					<Select size="small" value={String(perPage)} onChange={handleChange}>
						<MenuItem value={5}>5</MenuItem>
						<MenuItem value={10}>10</MenuItem>
						<MenuItem value={25}>25</MenuItem>
						<MenuItem value={50}>50</MenuItem>
					</Select>
					<Button onClick={() => nav.push(`/${domain}/write`)}>글 작성</Button>
				</article>
			</section>

			<BoardList boards={boards} domain={domain as string} />

			<InteractivePagination allCount={count} />
		</div>
	</div>);
}
