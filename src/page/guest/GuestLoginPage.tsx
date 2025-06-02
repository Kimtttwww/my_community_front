'use client'

import { GuestPath } from "@/entity/guest/model/GuestPath";
import { GuestValidSchema } from "@/entity/guest/model/GuestValidSchema";
import css from "@/entity/guest/ui/loginPage.module.css";
import { extractMessagesToFieldError } from "@/shared/lib/ValidUtils";
import { FormInputsErrorMessages } from "@/shared/model/shareTypes";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldErrors, FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  id: GuestValidSchema.ID,
  pwd: GuestValidSchema.ID
});

export default function GuestLoginPage() {
  const [validState, setValidState] = useState<FormInputsErrorMessages>({});
  const { register, handleSubmit } = useForm({ resolver: yupResolver(schema) });
  const nav = useRouter();

  // TODO 기능 검증 필요 / 로그인 후 ui 필요
  function handleValid(inputDatas: FieldValues) {
    axios.post(GuestPath.LOGIN, inputDatas)
      .then(() => nav.push('/'))
      .catch(() => alert('로그인 실패'))
  }

  function handleInvalid<T extends Record<string, any>>(errors: FieldErrors<T>) {
    setValidState(extractMessagesToFieldError(errors));
  }

  return (<div className="flex justifyContentCenter" style={{ paddingTop: '75px' }}>
    <section style={{ width: '400px', minHeight: '300px', border: '1px solid lightgray', borderRadius: '10px', marginTop: '100px', padding: '0 20px' }}>
      <article className="flex justifyContentCenter">
        <h2 style={{ margin: '50px 0' }}>My Community</h2>
      </article>
      <form id="form" onSubmit={handleSubmit(handleValid, handleInvalid)} className="flex" style={{ height: '150px', flexDirection: 'column', justifyContent: 'space-around' }}>
        <TextField label="아이디" {...register('id')} error={Boolean(validState?.id)} helperText={validState.id} className={`${css.spacing}`} />
        <TextField type="password" label="비밀번호" {...register('pwd')} error={Boolean(validState?.pwd)} helperText={validState.pwd} className={`${css.spacing}`} />
      </form>
      <article>
        <Button type="submit" form={'form'} variant="contained" color="primary" size="large" fullWidth style={{ margin: '25px 0' }}>로그인</Button>
      </article>
    </section>
  </div>);
}
