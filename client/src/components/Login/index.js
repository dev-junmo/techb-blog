import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { LOG_IN_REQUEST } from "../../reducer/user";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";

const Login = () => {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginDone, loginError } = useSelector(state => state.user);

  const onSubmitLogin = (data) => {
    dispatch({
      type: LOG_IN_REQUEST,
      data: { email: data.email, password: data.password }
    });
  }

  useEffect(() => {
    if(loginDone) {
      return navigate("/");
    }
  }, [loginDone]);

  useEffect(() => {
    if(loginError) {
      alert(loginError);
    }
  }, [loginError]);

  return (
    <div className="login-container">
      <h2 className="login-title">로그인</h2>
      <form onSubmit={handleSubmit(onSubmitLogin)}>
        <div className="email-area">
          <label htmlFor="email">이메일</label>
          <input id="email" type="email" name="email" placeholder="E-mail" { ...register("email") } />
        </div>
        <div className="password-area">
          <label htmlFor="password">비밀번호</label>
          <input id="password" type="password" name="password" placeholder="Password" { ...register("password") } />
        </div>
        <div>
          <button type="submit" disabled={isSubmitting} className="login-btn">로그인</button>
        </div>
      </form>
    </div>
  );
}

export default Login;