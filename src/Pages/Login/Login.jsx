import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./Login.module.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>LOGIN</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <a className={styles.forgotpw} href="/forgotpassword">
            Forgot Password
          </a>
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
        <div className={styles.gap}></div>
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
