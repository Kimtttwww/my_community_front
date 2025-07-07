import BoardListPage from "../board/BoardListPage";

export default function QnaListPage() {
	return (<div className="flex">
		{/* TODO qna 목록 절반, 작성 절반(메일 느낌으로, 200개씩 조회, 스크롤위주 + 페이징 최소) */}
		<div className="flex" style={{ width: '50%', minHeight: '100vh', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
			<section className="flex" style={{}}>
				<BoardListPage />
			</section>
		</div>
		<div className="flex" style={{ width: '50%', minHeight: '100vh', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
			<section className="flex" style={{}}>
				qwer
			</section>
		</div>
	</div>);
}