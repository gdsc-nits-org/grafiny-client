import React, { useState, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./Signup.module.scss";
import UserContext from "../../Global/Auth/authContext";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleValueChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "name") {
      setName(e.target.value);
    }
  };

  const context = useContext(UserContext);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>SIGN UP</h2>
      <div className={styles.form}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          required
          value={name}
          onChange={handleValueChange}
        />
        <input
          type="email"
          placeholder="E-mail"
          name="email"
          required
          value={email}
          onChange={handleValueChange}
        />
        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            name="password"
            value={password}
            onChange={handleValueChange}
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
        <button
          type="button"
          className={styles.button}
          onClick={() => {
            context.handleSignup(name, email, password);
          }}
        >
          Sign Up
        </button>
      </div>
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
