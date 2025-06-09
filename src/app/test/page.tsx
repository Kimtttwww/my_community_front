'use client'

import { GuestPath } from "@/entity/guest/model/GuestPath";
import axios, { AxiosResponse } from "axios";

export default function testingPathAndPage() {

	function handleClick() {
		axios.get(GuestPath.HOST + '/guest/test', { withCredentials: true })
			.then((res: AxiosResponse) => {
				console.log(res.data);
			});
	}

	return (<div className="flex justifyContentCenter" style={{ minHeight: '500px' }}>
		<button type="button" onClick={handleClick}>testing</button>
	</div>);
}
