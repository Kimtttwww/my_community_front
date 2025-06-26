'use client'

import { Pagination } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { combineURLSearchParams } from "../lib/searchParamsUtils";

type OwnProps = {
	allCount: number
}

export default function InteractivePagination({ allCount }: OwnProps) {
	const searchParams = useSearchParams();
	const nav = useRouter();

	function handleChange(_: React.ChangeEvent<unknown>, selectPage: number) {
		const url = combineURLSearchParams(searchParams, { currentPage: selectPage });
		nav.push('?' + url.toString());
	}

	return (
		<Pagination
			page={Number(searchParams.get('currentPage')) || 1}
			count={Math.ceil(allCount / (Number(searchParams.get('perPage')) || 10))}
			boundaryCount={3}
			onChange={handleChange}
			style={{ justifySelf: 'center', marginTop: '30px' }}
		/>
	);
}