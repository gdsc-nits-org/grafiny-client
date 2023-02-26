import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./Login.module.scss";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>LOGIN</h2>
      <form>
        <input type="email" placeholder="E-mail" required />
        <div className={styles.passwordWrapper}>
            <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
          />
          <a className={styles.forgotpw} href="#">Forgot Password</a>
          <div
            className={styles.passwordToggle}
            onClick={handlePasswordToggle}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                handlePasswordToggle();
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        <div className={styles.gap}>
        </div>
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
      <div className={styles.login}>
        Need an account? <a href="/">Sign Up</a>
      </div>
      <hr />
      <div className={styles.options}>Login Using</div>
      <div className={styles.imgs}>
        <div>
          <a href="/">
            <img src="/assets/Google.png" alt="logo" className={styles.img} />
          </a>
        </div>
        <div>
          <a href="/">
            <img src="/assets/Facebook.png" alt="logo" className={styles.img} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;