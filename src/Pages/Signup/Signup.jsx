import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./Signup.module.scss";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>SIGN UP</h2>
      <form>
        <input type="email" placeholder="E-mail" required />
        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
          />
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
        <button type="submit" className={styles.button}>
          Sign Up
        </button>
      </form>
      <div className={styles.login}>
        Already a User? <a href="/">Login</a>
      </div>
      <hr />
      <div className={styles.options}>Sign Up Using</div>
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

export default SignupForm;
