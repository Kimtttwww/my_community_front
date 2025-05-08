'use client'

import css from "@/entity/main/css/nav_bar.module.css";
import { Breadcrumbs, Link as MuiLink } from "@mui/material";
import NextLink from "next/link";
import { useEffect, useState } from "react";

export default function Nav_bar() {
  const [navs, setNavs] = useState<string[]>([]);

  useEffect(() => {
    // TODO 게시판들(도메인) 목록 불러오기
    setNavs(['asdf', 'qwer', 'zxcv']);
  }, []);

  return (
    <section className="flex" style={{ minHeight: '200px', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
      <h1>My Community</h1>
      <Breadcrumbs>
        {navs.map((nav) => (<NextLink key={nav} href={'#'} className={`flex ${css.nav_title}`} style={{ cursor: 'pointer' }}>
          <MuiLink color="inherit" component="button" underline="hover">{nav}</MuiLink>
        </NextLink>))}
      </Breadcrumbs>
    </section>
  );
}