import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Login from "../../components/Login";
import SignUp from "../../components/SignUp";
import './style.scss';

const SignIn = () => {
  const [formChange, setFormChange] = useState(true);
  const [movingClass, setMovingClass] = useState('');
  const [movingFormClass, setMovingFormClass] = useState('');
  const [textPosition, setTextPosition] = useState('');
  const [textMoving, setTextMoving] = useState('');
  const { me } = useSelector(state => state.user);
  const navigate = useNavigate();

  const signInText = {
    signUpTitle: "Welcome Back!",
    signUpDescription: "사용하시는 두레이 이메일을 등록해 주세요.",
    logInTitle: "Hello, Friend!",
    logInDescription: "등록한 두레이 이메일로 로그인을 해주세요.",
  }

  const onClickChange = () => {
    if(formChange) {
      setMovingClass('moving');
      setMovingFormClass('moving-form-active');
      setTextMoving('moving-text');
    }else{
      setMovingClass('starting');
      setMovingFormClass('starting-form-active');
      setTextMoving('starting-text');
    }
    setTimeout(() => {
      setFormChange(v => !v);
      // if(formChange) {
      //   setTextPosition('login-text');
      // }else{
      //   setTextPosition('signup-text');
      // }
    }, 400)

    setTimeout(() => {
      if(formChange) {
        setTextPosition('login-text');
      }else{
        setTextPosition('signup-text');
      }
    }, 500)
  }

  useEffect(() => {
    if(me) {
      return navigate("/?category=All");
    }else{
      return navigate("/signin");
    }
  }, [me]);

  return (
    <div className="signin-container">
      <div className="signin-box">
        <div className={`moving-form ${movingFormClass}`}>
          { formChange ? <Login /> : <SignUp setFormChange={setFormChange} setMovingClass={setMovingClass} setMovingFormClass={setMovingFormClass} setTextMoving={setTextMoving} setTextPosition={setTextPosition} /> }
        </div>
        <div className={`moving-box ${movingClass}`}>
          <button type="button" className="signup-link-btn" onClick={onClickChange}>SIGN UP</button>
        </div>

        <div className={`text-area ${textPosition} ${textMoving}`}>
          {formChange ? (
            <div className="signup-text-container">
              <h2 className="signin-title">{ signInText.logInTitle }</h2>
              <p className="signin-description">{ signInText.logInDescription }</p>
            </div>
          ) : (
            <div className="login-text-container">
              <h2 className="signin-title">{ signInText.signUpTitle }</h2>
              <p className="signin-description">{ signInText.signUpDescription }</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignIn;