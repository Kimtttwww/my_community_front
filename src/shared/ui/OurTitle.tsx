import Link from "next/link";
import { JSX } from "react";

type OwnProps = {
	as?: keyof JSX.IntrinsicElements
}

export default function OurTitle({
	as: Tag = 'h2'
}: OwnProps) {
	return (<Tag style={{ margin: '50px 0' }}><Link href={'/'}>My Community</Link></Tag>);
}
