import css from "@/entity/board/css/viewPage.module.css";
import { getBoardTitle, getCategoryList } from "@/feature/board/api/boardGetApi";

type ownProps = {
  domain: string
};

export default async function BoardWritePage({ domain }: ownProps) {
  const [title, categoryList] = (await Promise.allSettled([getBoardTitle(domain), getCategoryList(domain)]))
    .filter((result) => result.status == "fulfilled")
    .map((res) => res.value);
  return (<>
    <h1 className={`flex ${css.spacing}`} style={{ textTransform: 'uppercase' }}>{String(title)}</h1>
    <hr className={`${css.spacing}`} style={{ borderColor: 'gray' }} />

  </>);
}