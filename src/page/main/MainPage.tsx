'use client'

import { Board, BoardNames } from "@/entity/board/type/BoardTypes";
import { getBoardList, getBoardNames } from "@/feature/board/api/boardGetApi";
import MainList from "@/widget/main/ui/MainList";
import NaviBar from "@/widget/main/ui/NaviBar";
import { useEffect, useState } from "react";

export default function MainPage() {
  const [boardNames, setBoardNames] = useState<BoardNames>([]);
  const [boardLists, setBoardList] = useState<Board[][]>([]);

  useEffect(() => {
    (async () => {
      const boardNames = (await getBoardNames()).filter((name) => name != 'qna' && name != 'faq')
      setBoardNames(boardNames);

      Promise.allSettled(boardNames?.map((name: string) => getBoardList(name)))
        .then((result) => {
          setBoardList(result.filter((req) => req.status == 'fulfilled').map((result) => result?.value?.boards));
        });
    })();
  }, []);

  return (<>
    <NaviBar navs={boardNames} />

    <div className="flex" style={{ flexWrap: "wrap", justifyContent: 'space-around' }}>
      {boardLists.map((boardList, i) => (<MainList key={boardNames[i]} listName={boardNames?.[i]?.toUpperCase()} listContent={boardList} />
      ))}
    </div>
  </>);
}