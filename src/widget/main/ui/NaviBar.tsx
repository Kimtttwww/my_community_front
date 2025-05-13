import { BoardNames } from "@/entity/board/type/BoardTypes";
import css from "@/entity/main/css/nav_bar.module.css";
import { Breadcrumbs, Link as MuiLink } from "@mui/material";
import NextLink from "next/link";

type ownProps = {
  navs: BoardNames
}

export default function NaviBar({navs}: ownProps) {
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