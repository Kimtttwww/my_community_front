import css from "@/entity/guest/css/loginPage.module.css";
import { Button, TextField } from "@mui/material";

export default function GuestLoginPage() {
  // TODO 기능 구현 필요
  function onSubmit() {

  }

  return (<div className="flex justifyContentCenter" style={{ paddingTop: '75px' }}>
    <section style={{ width: '400px', minHeight: '300px', border: '1px solid lightgray', borderRadius: '10px', marginTop: '100px', padding: '0 20px' }}>
      <article className="flex justifyContentCenter">
        <h2 style={{ margin: '50px 0' }}>My Community</h2>
      </article>
      <article className="flex" style={{ minHeight: '100px', flexDirection: 'column', justifyContent: 'space-around' }}>
        <TextField label="아이디" className={`${css.spacing}`} />
        <TextField label="비밀번호" className={`${css.spacing}`} />
      </article>
      <article>
        <Button variant="contained" color="primary" size="large" fullWidth style={{ margin: '25px 0' }}>로그인</Button>
      </article>
    </section>
  </div>);
}