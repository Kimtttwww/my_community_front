'use client'

import { GuestPath } from "@/entity/guest/model/GuestPath";
import myAxios from "@/shared/lib/myAxios";
import { AxiosResponse } from "axios";

export default function testingPathAndPage() {

	function handleClick() {
		myAxios.get(GuestPath.HOST + '/guest/test')
			.then((res: AxiosResponse) => {
				console.log(res.data);
				alert('성공!');
			});
	}

	return (<div className="flex justifyContentCenter" style={{ minHeight: '500px' }}>
		<button type="button" onClick={handleClick}>testing</button>
	</div>);
}
