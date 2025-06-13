'use client'

import { GuestPath } from "@/entity/guest/model/GuestPath";
import { GuestValidSchema } from "@/entity/guest/model/GuestValidSchema";
import css from "@/entity/guest/ui/loginPage.module.css";
import useFormInputErrorHandler from "@/shared/lib/useFormInputErrorHandler";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
	id: GuestValidSchema.ID,
	pwd: GuestValidSchema.PWD,
	name: GuestValidSchema.NAME
});

export default function GuestLogupPage() {
	const nav = useRouter();
	const { register, handleSubmit } = useForm({ resolver: yupResolver(schema) });
	const { validState, handleDefaultInvalid } = useFormInputErrorHandler();

	function handleValid(inputDatas: FieldValues) {
		inputDatas.nickname = inputDatas.name;

 		axios.post(GuestPath.HOST + '/guest/logup', inputDatas)
			.then(() => {
				alert('새로운 뉴비는 언제나 환영이야!');
				nav.push('/login');
			})
			.catch(() => alert('회원가입 실패'));
	}

	return (<div className="flex justifyContentCenter" style={{ paddingTop: '75px' }}>
		<section style={{ width: '400px', minHeight: '300px', border: '1px solid lightgray', borderRadius: '10px', marginTop: '30px', padding: '0 20px' }}>
			<article className="flex justifyContentCenter">
				<h2 style={{ margin: '50px 0' }}><Link href={'/'}>My Community</Link></h2>
			</article>
			<form id="form" onSubmit={handleSubmit(handleValid, handleDefaultInvalid)} className="flex" style={{ minHeight: '150px', flexDirection: 'column', justifyContent: 'space-around' }}>
				<TextField label="아이디" {...register('id')} error={Boolean(validState?.id)} helperText={validState.id} autoFocus size="small" className={`${css.spacing}`} />
				<TextField type="password" label="비밀번호" {...register('pwd')} error={Boolean(validState?.pwd)} helperText={validState.pwd} size="small" className={`${css.spacing}`} />
				<TextField label="이름" {...register('name')} error={Boolean(validState?.name)} helperText={validState.name} size="small" placeholder="별명도 가능합니다." className={`${css.spacing}`} />
			</form>
			<article>
				<Button type="submit" form={'form'} variant="contained" color="success" size="large" fullWidth style={{ margin: '25px 0' }}>회원가입</Button>
			</article>
		</section>
	</div>);
}
