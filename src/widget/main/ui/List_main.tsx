import css from "@/entity/main/css/list.module.css";
import Link from "next/link";

type ownProps = {
  listName?: string;
  listContent: object[];
}

export default function List_main({ listName, listContent }: ownProps) {
  listName = listName ?? '공지사항';

  return (  // TODO 변수 적용 필요
    <section className="flex" style={{ width: '560px', minHeight: '100px', flexDirection: 'column', margin: '20px 5px', padding: '5px' }}>
      <Link href={''} style={{ fontSize: 'x-large', fontWeight: "bold", marginBottom: '15px' }}>{listName}</Link>
      <section className="flex" style={{ flexDirection: 'column' }}>
        {listContent.map((item) => (
          <article key={'item_no'} className={`flex ${css.list_item}`}>
            <p style={{ width: '65%' }}>이거슨 제목</p>
            <p className={`flex`}>끄적인놈</p>
            <p className={`flex`}>날짜</p>
          </article>
        ))}
      </section>
    </section>
  )
}
