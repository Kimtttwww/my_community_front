import { BoardName } from "@/entity/board/model/boardTypes";
import css from "@/entity/main/ui/nav_bar.module.css";
import OurTitle from "@/shared/ui/OurTitle";
import GuestAvatar from "@/widget/guest/ui/GuestAvatar";
import { Breadcrumbs, Link as MuiLink } from "@mui/material";
import NextLink from "next/link";

type OwnProps = {
	names: BoardName[],
	children?: React.ReactNode
}

export default function NaviBar({ names, children }: OwnProps) {
	return (
		<section className="flex" style={{ minHeight: '200px', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
			{children}
			<div className="flex" style={{ width: '100%', flexDirection: 'row-reverse', position: 'absolute', top: '0', right: '0' }}>
				<GuestAvatar />
			</div>
			<OurTitle as="h1" />
			<Breadcrumbs>
				{names.map(({ board, subtitle }) => (<NextLink key={board} href={`/${board}`} className={`flex ${css.nav_title}`} style={{ cursor: 'pointer' }}>
					<MuiLink color="inherit" component="button" underline="hover">{subtitle || board}</MuiLink>
				</NextLink>))}
			</Breadcrumbs>
		</section>
	);
}
