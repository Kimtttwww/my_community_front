import css from "@/entity/board/ui/viewPage.module.css";
import { getBoard, getBoardTitle } from "@/feature/board/api/boardGetApi";

type ownProps = {
  domain: string,
  boardNo: string
};

export default async function BoardViewPage({ domain, boardNo }: ownProps) {
  const board = await getBoard(domain, Number(boardNo));
  const title = await getBoardTitle(domain);

  return (<div className="flex" style={{ width: '1000px', minHeight: '600px', flexDirection: 'column', margin: '0 auto', marginTop: '50px' }}>
    <h1 className={`flex ${css.spacing}`} style={{ textTransform: 'uppercase' }}>{title}</h1>
    <hr className={`${css.spacing}`} style={{ borderColor: 'gray' }} />

    <section className={`flex ${css.spacing}`} style={{ flexDirection: 'column', padding: '3px 0' }}>
      <article><b>{board?.title}</b></article>
			{/* TODO 아마 이쯤에 이 글의 카테고리가 필요함 */}
      <article>{board?.writer}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{board?.created}</article>
    </section>
    <hr className={`${css.spacing}`} style={{ borderColor: 'lightgray' }} />

    <div style={{ paddingTop: '10px' }}>{board?.content}</div>
  </div>);
}
