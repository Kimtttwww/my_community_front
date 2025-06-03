'use client'

import { Category } from "@/entity/board/model/boardTypes";
import { BoardValidSchema } from "@/entity/board/model/BoardValidSchema";
import css from "@/entity/board/ui/writePage.module.css";
import { getBoardTitle, getCategoryList } from "@/feature/board/api/boardGetApi";
import useFormInputErrorHandler from "@/shared/lib/useFormInputErrorHandler";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { cookies } from "next/headers";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";

type ownProps = {
  domain: string
};

const schema = yup.object({
  title: BoardValidSchema.title,
  content: BoardValidSchema.content
});

export default function BoardWritePage({ domain }: ownProps) {
  const [boardTitle, setBoardTitle] = useState<string>('');
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const { register, handleSubmit } = useForm({ resolver: yupResolver(schema) });
  const { validState, handleDefaultInvalid } = useFormInputErrorHandler();

  useEffect(() => {
    Promise.allSettled([getBoardTitle(domain), getCategoryList(domain)])
      .then((results) => results.filter((result) => result.status == 'fulfilled').map((res) => res.value))
      .then((res) => {
        const [boardTitle, categoryList] = res;
        setBoardTitle(boardTitle as string);
        setCategoryList(categoryList as Category[]);
      });
  }, []);

  // TODO 기능 구현 필요
  function handleValid(inputDatas: FieldValues) {
    console.log('유효함');

    // inputDatas.gid = 
    console.log(inputDatas);
  }

  // TODO 기능 추가 필요
  return (<div className="flex" style={{ width: '1000px', minHeight: '600px', flexDirection: 'column', margin: '0 auto', marginTop: '50px' }}>
    <h1 className='flex' style={{ textTransform: 'uppercase', marginBottom: '5px' }}>{boardTitle}</h1>
    <hr style={{ borderColor: 'gray' }} />

    <form onSubmit={handleSubmit(handleValid, handleDefaultInvalid)} style={{ margin: '30px 50px', padding: '15px 0' }}>
      <article className={`${css.spacing}`}>
        <TextField {...register('title')} error={Boolean(validState?.title)} helperText={validState.title} size="small" label='제목' style={{ minWidth: '50%', marginRight: '15px' }} />
        <FormControl size="small" style={{ minWidth: '25%' }}>
          <InputLabel>카테고리</InputLabel>
          <Select label='카테고리' defaultValue={0}>
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
