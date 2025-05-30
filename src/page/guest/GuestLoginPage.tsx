'use client'

import css from "@/entity/guest/css/loginPage.module.css";
import { GuestApi } from "@/entity/guest/path/GuestApi";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

type ValidState = { [K: string]: boolean }

export default function GuestLoginPage() {
  const [validState, setValidState] = useState<ValidState>({});
  const { register, handleSubmit } = useForm();
  const nav = useRouter();

  useEffect(() => {
    console.log('validState is ');
    console.log(validState);

  }, [validState])
  // TODO 기능 구현 필요
  function handleValid(values: FieldValues) {
    axios.post(GuestApi.LOGIN, values)
      .then(() => nav.push('/'))
      .catch(() => alert('로그인 실패'))
  }

  function handleInvalid(values: FieldValues) {
    console.log("유효하지 않음");
    const newValidState: ValidState = {};

    Object.entries<FieldValues>(values).forEach(([key]) => {
      newValidState[key] = true;
    });
    setValidState(newValidState);
  }

  return (<div className="flex justifyContentCenter" style={{ paddingTop: '75px' }}>
    <section style={{ width: '400px', minHeight: '300px', border: '1px solid lightgray', borderRadius: '10px', marginTop: '100px', padding: '0 20px' }}>
      <article className="flex justifyContentCenter">
        <h2 style={{ margin: '50px 0' }}>My Community</h2>
      </article>
      <form id="form" onSubmit={handleSubmit(handleValid, handleInvalid)} className="flex" style={{ height: '150px', flexDirection: 'column', justifyContent: 'space-around' }}>
        <TextField label="아이디" {...register('id', { required: 'asdf', minLength: { value: 5, message: '짧' } })} error={validState?.id || false} className={`${css.spacing}`} />
        <TextField type="password" label="비밀번호" {...register('pwd', { required: 'qwer' })} error={validState?.pwd || false} className={`${css.spacing}`} />
      </form>
      <article>
        <Button type="submit" form={'form'} variant="contained" color="primary" size="large" fullWidth style={{ margin: '25px 0' }}>로그인</Button>
      </article>
    </section>
  </div>);
}