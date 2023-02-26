import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import GoogleLogo from "./Google.png";
import FacebookLogo from "./Facebook.png";
import Styles from "./Login.module.scss";

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <div id={Styles.wrapper}>
      <h2>LOGIN</h2>
      <form action="#">
        <div className={Styles.email}>
          <input type="email" placeholder="E-mail" required />
        </div>
        <div className={Styles.password}>
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            required
          />
          <button
            className={Styles.passwordToggle}
            onClick={togglePasswordVisibility}
            role="button"
            tabIndex={0}
          >
            {passwordVisible ? <Visibility /> : <VisibilityOff />}
          </button>
        </div>
      </form>
      <div className={Styles.forgot}>
        <a href="#">Forgot Password?</a>
      </div>
      <button className={Styles.loginButton} type="submit">Login</button>
      <div className={Styles.Signup}>
        Need an account? <a href="#">Sign Up</a>
      </div>
      <hr width />
      <div className={Styles.Options}>Login Using</div>
      <div className={Styles.imgs}>
        <div>
          <a href="#">
            <img src={GoogleLogo} alt="Google" className={Styles.img} />
          </a>
        </div>
        <div>
          <a href="#">
            <img src={FacebookLogo} alt="Facebook" className={Styles.img} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
