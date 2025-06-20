import BoardListPage from "@/page/board/BoardListPage";

type ownProps = {
	params: {
		domain: string
	},
	searchParams: object
};

export default async function BoardListPath({ params, searchParams }: ownProps) {
	return (<BoardListPage {...(await params)} searchParams={await searchParams} />);
}
