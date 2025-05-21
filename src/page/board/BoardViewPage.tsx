'use client'

import css from "@/entity/board/css/viewPage.module.css";
import { Board } from "@/entity/board/type/BoardTypes";
import { getBoard } from "@/feature/board/api/boardGetApi";
import { useEffect, useState } from "react";

type ownProps = {
  domain: string,
  boardNo: string
};

export default function BoardViewPage({ domain, boardNo }: ownProps) {
  const [board, setBoard] = useState<Board>();

  useEffect(() => {
    getBoard(domain, Number(boardNo)).then((board) => {
      setBoard(board);
    });
  }, []);

  return (<div className="flex" style={{ width: '1000px', minHeight: '600px', flexDirection: 'column', margin: '0 auto', marginTop: '50px' }}>
    <h1 className={`flex ${css.spacing}`} style={{ textTransform: 'uppercase'/*, borderBottom: 'solid 1px gray'*/ }}>{domain}</h1>
    <hr className={`${css.spacing}`} style={{ borderColor: 'gray' }} />

    <section className={`flex ${css.spacing}`} style={{flexDirection: 'column', padding: '3px 0'}}>
      <article><b>{board?.title}</b></article>
      <article>{board?.writer}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{board?.created}</article>
    </section>
    <hr className={`${css.spacing}`} style={{ borderColor: 'lightgray' }} />

    <div style={{paddingTop: '10px'}}>{board?.content}</div>
  </div>);
}
