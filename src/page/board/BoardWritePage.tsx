'use client'

import css from "@/entity/board/css/writePage.module.css";
import { Category } from "@/entity/board/type/boardTypes";
import { getBoardTitle, getCategoryList } from "@/feature/board/api/boardGetApi";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";

type ownProps = {
  domain: string
};

export default function BoardWritePage({ domain }: ownProps) {
  const [title, setTitle] = useState<string>('');
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  useEffect(() => {
    Promise.allSettled([getBoardTitle(domain), getCategoryList(domain)])
      .then((results) => results.filter((result) => result.status == 'fulfilled').map((res) => res.value))
      .then((res) => {
        const [title, categoryList] = res;
        setTitle(title as string);
        setCategoryList(categoryList as Category[]);
      });
  }, []);

  // TODO 기능 추가 필요
  return (<div className="flex" style={{ width: '1000px', minHeight: '600px', flexDirection: 'column', margin: '0 auto', marginTop: '50px' }}>
    <h1 className='flex' style={{ textTransform: 'uppercase', marginBottom: '5px' }}>{title}</h1>
    <hr style={{ borderColor: 'gray' }} />

    <form style={{ margin: '30px 50px', padding: '15px 0' }}>
      <article className={`${css.spacing}`}>
        <TextField size="small" label='제목 입력' style={{ minWidth: '50%', marginRight: '15px' }} />
        <FormControl size="small" style={{ minWidth: '25%' }}>
          <InputLabel>카테고리</InputLabel>
          <Select label='카테고리'>
            <MenuItem value={''}>일반</MenuItem>
            {(categoryList).map((category) => (<MenuItem key={category?.categoryName} value={category?.categoryNo}>{category?.categoryName}</MenuItem>))}
          </Select>
        </FormControl>
      </article>

      <article className={`${css.spacing}`}>
        <TextField fullWidth multiline minRows={10}></TextField>
      </article>

      <article className="flex" style={{ flexDirection: 'row-reverse' }}>
        <Button type="submit" variant="contained" color="success">등록</Button>
        <Button variant="outlined" color="inherit" style={{ marginRight: '10px' }}>취소</Button>
      </article>
    </form>
  </div>);
}
