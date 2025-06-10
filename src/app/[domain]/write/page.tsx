import BoardWritePage from "@/page/board/BoardWritePage";

type ownProps = {
	params: {
		domain: string
	}
};

export default async function BoardWritePath({ params }: ownProps) {
	return (<BoardWritePage {...(await params)} />);
}
