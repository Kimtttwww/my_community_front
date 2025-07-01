import { BoardDomain } from "@/entity/board/model/boardTypes";
import BoardWritePage from "@/page/board/BoardWritePage";

type OwnProps = {
	params: {
		domain: BoardDomain
	}
};

export default async function BoardWritePath({ params }: OwnProps) {
	return (<BoardWritePage {...(await params)} />);
}
