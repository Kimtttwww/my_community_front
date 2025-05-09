'use client'

import { BoardNames } from "@/entity/board/type/BoardTypes";
import css from "@/entity/main/css/nav_bar.module.css";
import { getBoardNames } from "@/feature/board/api/boardGetApi";
import { Breadcrumbs, Link as MuiLink } from "@mui/material";
import NextLink from "next/link";
import { useEffect, useState } from "react";

export default function Nav_bar() {
  const [navs, setNavs] = useState<BoardNames>([]);

  useEffect(() => {
    (async () => {
      setNavs(await getBoardNames());
    })();
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