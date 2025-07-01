import { BoardDomain } from "@/entity/board/model/boardTypes";
import BoardViewPage from "@/page/board/BoardViewPage";

type OwnProps = {
	params: {
		domain: BoardDomain,
		boardNo: string
	}
};

export default async function BoardViewPath({ params }: OwnProps) {
	return (<BoardViewPage {...(await params)} />);
}
