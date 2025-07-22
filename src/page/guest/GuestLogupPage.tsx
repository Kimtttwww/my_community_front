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
	pwd: GuestValidSchema.PWD,
	name: GuestValidSchema.NAME
});

export default function GuestLogupPage() {
	const nav = useRouter();
	const { register, handleSubmit } = useForm({ resolver: yupResolver(schema) });
	const { validState, handleDefaultInvalid } = useFormInputErrorHandler();
	const inputProps = { size: "small" as "small", fullWidth: true };

	function handleValid(inputDatas: FieldValues) {
		inputDatas.nickname = inputDatas.name;

		axios.post(GuestPath.HOST + '/guest/logup', inputDatas)
			.then(() => {
				alert('새로운 뉴비는 언제나 환영이야!');
				nav.push('/login');
			})
			.catch(() => alert('회원가입 실패'));
	}

	return (<>
		<NaviBar />
		<div className="flex justifyContentCenter" style={{ paddingTop: '35px' }}>
			<Paper component={'form'} variant="outlined" onSubmit={handleSubmit(handleValid, handleDefaultInvalid)} style={{ width: '400px', minHeight: '300px', marginTop: '30px', padding: '20px 20px' }}>
				<h2 className={`${css.spacing}`} style={{ textAlign: 'center' }}>회원가입</h2>
				<TextField label="아이디" {...register('id')} error={Boolean(validState?.id)} helperText={validState.id} autoFocus {...inputProps} className={`${css.spacing}`} />
				<TextField type="password" label="비밀번호" {...register('pwd')} error={Boolean(validState?.pwd)} helperText={validState.pwd} {...inputProps} className={`${css.spacing}`} />
				<TextField label="이름" {...register('name')} error={Boolean(validState?.name)} helperText={validState.name} placeholder="별명도 가능합니다." {...inputProps} className={`${css.spacing}`} />
				<Button type="submit" variant="contained" color="success" size="large" fullWidth className={`${css.spacing}`}>회원가입</Button>
			</Paper>
		</div>
	</>);
}
