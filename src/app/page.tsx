import List_main from "@/widget/main/ui/List_main";
import Nav_bar from "@/widget/main/ui/Nav_bar";
import css from "./page.module.css";

export default function Home() {
  return (<>
    <Nav_bar />

    <div className="flex" style={{ flexWrap: "wrap", justifyContent: 'space-around' }}>
      <List_main listName="공지사항" listContent={[{}]} />
    </div>
  </>);
}
