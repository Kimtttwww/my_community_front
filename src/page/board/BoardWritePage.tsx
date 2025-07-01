'use client'

import { BoardPath } from "@/entity/board/model/BoardPath";
import { BoardDomain, Category } from "@/entity/board/model/boardTypes";
import { BoardValidSchema } from "@/entity/board/model/BoardValidSchema";
import css from "@/entity/board/ui/writePage.module.css";
import { getBoardTitle, getCategoryList } from "@/feature/board/api/boardGetApi";
import myAxios from "@/shared/lib/myAxios";
import useFormInputErrorHandler from "@/shared/lib/useFormInputErrorHandler";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";

type OwnProps = {
	domain: BoardDomain
};

const schema = yup.object({
	title: BoardValidSchema.title,
	content: BoardValidSchema.content
	, category: yup.number().required()
});

export default function BoardWritePage({ domain }: OwnProps) {
	const [boardTitle, setBoardTitle] = useState<string>('');
	const [categoryList, setCategoryList] = useState<Category[]>([]);
	const { register, handleSubmit } = useForm({ resolver: yupResolver(schema) });
	const { validState, handleDefaultInvalid } = useFormInputErrorHandler();
	const nav = useRouter();

	useEffect(() => {
		getBoardTitle(domain)
			.then((boardTitle) => setBoardTitle(boardTitle));
		getCategoryList(domain)
			.then((categoryList) => setCategoryList(categoryList));
	}, []);

	// TODO 기능 구현 필요
	function handleValid(inputDatas: FieldValues) {
		// TODO 여기에 작성자 식별자 삽입 필요
		inputDatas.writer = '???';

		console.log(inputDatas);
		myAxios.post(BoardPath.BOARD_LIST(domain) + 'write', inputDatas)
			.then(() => {
				alert('게시글 작성 성공');
				nav.push(BoardPath.BOARD_LIST(domain));
			})
			.catch(() => alert('게시글 작성 실패'))
	}

	return (<div className="flex" style={{ width: '1000px', minHeight: '600px', flexDirection: 'column', margin: '0 auto', marginTop: '50px' }}>
		<h1 className='flex' style={{ textTransform: 'uppercase', marginBottom: '5px' }}>{boardTitle}</h1>
		<hr style={{ borderColor: 'gray' }} />

		<form onSubmit={handleSubmit(handleValid, handleDefaultInvalid)} style={{ margin: '30px 50px', padding: '15px 0' }}>
			<article className={`${css.spacing}`}>
				<TextField {...register('title')} error={Boolean(validState?.title)} helperText={validState.title} size="small" label='제목' style={{ minWidth: '50%', marginRight: '15px' }} />
				<FormControl size="small" style={{ minWidth: '25%' }}>
					<InputLabel>카테고리</InputLabel>
					<Select {...register('category')} label='카테고리' defaultValue={0}>
						<MenuItem value={0}>일반</MenuItem>
						{categoryList.map((category) => (<MenuItem key={category?.categoryName} value={category?.categoryNo}>{category?.categoryName}</MenuItem>))}
					</Select>
				</FormControl>
			</article>

			<article className={`${css.spacing}`}>
				<TextField {...register('content')} error={Boolean(validState?.content)} helperText={validState.content} fullWidth multiline minRows={10}></TextField>
			</article>

			<article className="flex" style={{ flexDirection: 'row-reverse' }}>
				<Button type="submit" variant="contained" color="success">등록</Button>
				<Button variant="outlined" color="inherit" style={{ marginRight: '10px' }}>취소</Button>
			</article>
		</form>
	</div>);
}
