'use client'

import { GuestPath } from "@/entity/guest/model/GuestPath";
import { GuestValidSchema } from "@/entity/guest/model/GuestValidSchema";
import css from "@/entity/guest/ui/loginPage.module.css";
import useFormInputErrorHandler from "@/shared/lib/useFormInputErrorHandler";
import NaviBar from "@/shared/ui/NaviBar";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Paper, TextField } from "@mui/material";
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

	return (<>
		<NaviBar />
		<div className="flex justifyContentCenter" style={{ paddingTop: '35px' }}>
			<Paper component={'form'} variant="outlined" onSubmit={handleSubmit(handleValid, handleDefaultInvalid)} style={{ width: '400px', minHeight: '200px', marginTop: '30px', padding: '20px 20px' }}>
				<h2 className={`${css.spacing}`} style={{ textAlign: 'center' }}>로그인</h2>
				<TextField label="아이디" {...register('id')} error={Boolean(validState?.id)} helperText={validState.id} autoFocus fullWidth className={`${css.spacing}`} />
				<TextField type="password" label="비밀번호" {...register('pwd')} error={Boolean(validState?.pwd)} helperText={validState.pwd} fullWidth className={`${css.spacing}`} />
				<Button type="submit" variant="contained" color="primary" size="large" fullWidth className={`${css.spacing}`}>로그인</Button>
			</Paper>
		</div>
	</>);
}
