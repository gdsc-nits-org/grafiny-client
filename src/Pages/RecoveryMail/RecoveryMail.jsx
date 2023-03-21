import React, { useState } from "react";
import styles from "./RecoveryMail.module.scss";

const RecoveryMail = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.heading}>ACCOUNT RECOVERY</h3>
      <form onSubmit={handleSubmit}>
        <p className={styles.recoverymessage}>
          We will send you an OTP to the email you provided for your account recovery.
        </p>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <button type="submit" className={styles.button}>
          Send OTP
        </button>
      </form>
    </div>
  );
};

export default RecoveryMail;
