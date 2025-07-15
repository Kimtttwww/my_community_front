'use client'

import { GuestPath } from "@/entity/guest/model/GuestPath";
import { GuestValidSchema } from "@/entity/guest/model/GuestValidSchema";
import css from "@/entity/guest/ui/loginPage.module.css";
import useFormInputErrorHandler from "@/shared/lib/useFormInputErrorHandler";
import OurTitle from "@/shared/ui/OurTitle";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
	id: GuestValidSchema.ID,
	pwd: GuestValidSchema.ID
});

export default function GuestLoginPage() {
	const nav = useRouter();
	const { register, handleSubmit } = useForm({ resolver: yupResolver(schema) });
	const { validState, handleDefaultInvalid } = useFormInputErrorHandler();

	function handleValid(inputDatas: FieldValues) {
		axios.post(GuestPath.LOGIN, inputDatas, { withCredentials: true })
			.then(() => {
				alert('로그인 성공');
				nav.push('/');
			})
			.catch(() => alert('로그인 실패'));
	}

	return (<div className="flex justifyContentCenter" style={{ paddingTop: '75px' }}>
		<section style={{ width: '400px', minHeight: '300px', border: '1px solid lightgray', borderRadius: '10px', marginTop: '30px', padding: '0 20px' }}>
			<article className="flex justifyContentCenter">
				<OurTitle />
			</article>
			<form id="form" onSubmit={handleSubmit(handleValid, handleDefaultInvalid)} className="flex flexDirectionColumn" style={{ height: '150px', justifyContent: 'space-around' }}>
				<TextField label="아이디" {...register('id')} error={Boolean(validState?.id)} helperText={validState.id} autoFocus className={`${css.spacing}`} />
				<TextField type="password" label="비밀번호" {...register('pwd')} error={Boolean(validState?.pwd)} helperText={validState.pwd} className={`${css.spacing}`} />
			</form>
			<article>
				<Button type="submit" form={'form'} variant="contained" color="primary" size="large" fullWidth style={{ margin: '25px 0' }}>로그인</Button>
			</article>
		</section>
	</div>);
}
