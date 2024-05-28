import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { SIGN_UP_REQUEST, SIGN_UP_RESET } from "../../reducer/user";
import "./style.scss";

const SignUp = ({ setFormChange, setMovingClass, setMovingFormClass, setTextMoving, setTextPosition }) => {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const [passwordError, setPasswordError] = useState(false);
  const dispatch = useDispatch();
  const { signUpDone, signUpError } = useSelector(state => state.user);

  const onSubmitSignUp = (data) => {
    if(data.password !== data.passwordCheck) {
      return setPasswordError(true);
    }

    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email: data.email, nickname: data.nickname, password: data.password }
    });
  }

  useEffect(() => {
    if(signUpDone) {
      dispatch({
        type: SIGN_UP_RESET,
      });

      alert("이메일이 등록 되었습니다:)");

      setMovingClass('starting');
      setMovingFormClass('starting-form-active');
      setTextMoving('starting-text');

      setFormChange(v => !v);

      setTextPosition('signup-text');
    }
  }, [signUpDone]);

  useEffect(() => {
    if(signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  return (
    <div className="signup-container">
      <h2 className="signup-title">이메일 등록하기</h2>
      <form onSubmit={handleSubmit(onSubmitSignUp)}>
        <div className="email-area">
          <label htmlFor="email">이메일</label>
          <input name="email" type="email" placeholder="E-email" required { ...register("email") } />
        </div>
        <div className="nickname-area">
          <label htmlFor="nickname">닉네임</label>
          <input name="nickname" type="nickname" placeholder="Nickname" required { ...register("nickname") } />
        </div>
        <div className="password-area">
          <label htmlFor="password">비밀번호</label>
          <input name="password" type="password" placeholder="Password" required { ...register("password") } />
          { passwordError ? <span className="error-password-message">비밀번호가 일치하지 않습니다.</span> : null }
        </div>
        <div className="password-check-area">
          <label htmlFor="passwordCheck">비밀번호 확인</label>
          <input name="passwordCheck" type="password" placeholder="Password Check" required { ...register("passwordCheck") } />
        </div>
        <div>
          <button type="submit" disabled={isSubmitting} className="signup-btn">가입하기</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;