import { Button } from "@mui/material";
import Link from "next/link";

export default function GuestAvatar() {
	return (<>
		<Button variant="outlined" color="info" style={{ margin: '5px 10px' }}>
			<Link href={'/login'}>로그인</Link>
		</Button>
		{/* TODO 로그인 된 후 ui 필요 */}
	</>);
}
