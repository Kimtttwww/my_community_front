'use client'

import css from "@/shared/css/nav_bar.module.css";
import { useEffect, useState } from "react";

export default function Nav_bar() {
	const [navs, setNavs] = useState<string[]>([]);

	useEffect(() => {
		// TODO 게시판들(도메인) 목록 불러오기
		setNavs(['asdf', 'qwer', 'zxcv']);
	}, []);

	return (
		<div className="flex" style={{ height: '30px', justifyContent: 'space-around' }}>
			{navs.map((nav) => (<h4 className={`flex ${css.nav_title}`}>{nav}</h4>))}
		</div>
	);
}