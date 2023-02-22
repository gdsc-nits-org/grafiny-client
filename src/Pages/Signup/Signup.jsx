import React from "react";
import styles from "./Signup.module.scss";

const SignupForm = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>SIGN UP</h2>
      <form>
        <input type="email" placeholder="E-mail" required />
        <input type="password" placeholder="Password" required />
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
