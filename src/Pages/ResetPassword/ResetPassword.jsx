import React, { useState } from "react";
import styles from "./ResetPassword.module.scss";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.heading}>VERIFIED!</h3>
      <form onSubmit={handleSubmit}>
        <p className={styles.recoverymessage}>Reset your password.</p>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
        />
        <button type="submit" className={styles.button}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
