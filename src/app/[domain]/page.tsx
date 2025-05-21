import BoardListPage from "@/page/board/BoardListPage";

type ownProps = {
  params: {
    domain: string
  }
};

export default async function BoardListPath({ params }: ownProps) {
  return (<BoardListPage {...(await params)} />);
}
