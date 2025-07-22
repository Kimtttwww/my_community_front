import { Button } from "@mui/material";
import Link from "next/link";

export default function NaviBar() {
	return (
		<section className="flex" style={{ justifyContent: 'space-between', alignItems: 'center', padding: '5px 10px' }}>
			<h2><Link href={'/'}>My Community</Link></h2>
			<Button variant="outlined" color="info" style={{ margin: '5px 10px' }}>
				<Link href={'/login'}>로그인</Link>
			</Button>
		</section>
	);
}
