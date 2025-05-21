import BoardViewPage from "@/page/board/BoardViewPage";

type ownProps = {
  params: {
    domain: string,
    boardNo: string
  }
};

export default async function BoardViewPath({ params }: ownProps) {
  return (<BoardViewPage {...(await params)} />);
}
