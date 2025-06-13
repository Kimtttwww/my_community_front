'use client'

import { GuestValidSchema } from "@/entity/guest/model/GuestValidSchema";
import useFormInputErrorHandler from "@/shared/lib/useFormInputErrorHandler";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
	id: GuestValidSchema.ID
});

export default function GuestLogupPage() {
	const nav = useRouter();
	const { register, handleSubmit } = useForm({ resolver: yupResolver(schema) });
	const {validState, handleDefaultInvalid} = useFormInputErrorHandler();

	function handleValid(inputDatas: FieldValues) {
		alert('새로운 뉴비는 언제나 환영이야!');
		nav.push('/login');
	}

	return (<div className="flex justifyContentCenter" style={{ paddingTop: '75px' }}>
		<section style={{ width: '400px', minHeight: '300px', border: '1px solid lightgray', borderRadius: '10px', marginTop: '30px', padding: '0 20px' }}>
			<article className="flex justifyContentCenter">
				<h2 style={{ margin: '50px 0' }}>My Community</h2>
			</article>
			<form id="form" onSubmit={handleSubmit(handleValid, handleDefaultInvalid)} className="flex" style={{ height: '150px', flexDirection: 'column', justifyContent: 'space-around' }}>
				<TextField label="아이디" {...register('id')} error={Boolean(validState?.id)} helperText={validState.id} autoFocus placeholder="별명도 가능합니다." />
				{/* <TextField type="password" label="비밀번호" {...register('pwd')} error={Boolean(validState?.pwd)} helperText={validState.pwd} className={`${css.spacing}`} /> */}
			</form>
			<article>
				<Button type="submit" form={'form'} variant="contained" color="primary" size="large" fullWidth style={{ margin: '25px 0' }}>로그인</Button>
			</article>
		</section>
	</div>);
}
