import { BoardName } from "@/entity/board/model/boardTypes";
import css from "@/entity/main/ui/nav_bar.module.css";
import { Breadcrumbs, Link as MuiLink } from "@mui/material";
import NextLink from "next/link";

type ownProps = {
  names: BoardName[],
  children?: React.ReactNode
}

export default function NaviBar({ names, children }: ownProps) {
  return (
    <section className="flex" style={{ minHeight: '200px', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
      {children}
      <h1>My Community</h1>
      <Breadcrumbs>
        {names.map(({board, subtitle}) => (<NextLink key={board} href={`/${board}`} className={`flex ${css.nav_title}`} style={{ cursor: 'pointer' }}>
          <MuiLink color="inherit" component="button" underline="hover">{subtitle || board}</MuiLink>
        </NextLink>))}
      </Breadcrumbs>
    </section>
  );
}
