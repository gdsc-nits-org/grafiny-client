import React, { useState } from "react";
import styles from "./Otp.module.scss";

const Otp = () => {
  const [otp, setOtp] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`OTP: ${otp}`);
  };

  const handleResendClick = () => {
    console.log("Resending OTP...");
  };

  return (
    <div className={styles.wrapper}>
      <h2>Confirm your email</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Enter OTP"
          required
          value={otp}
          onChange={(event) => setOtp(event.target.value)}
        />
        <button type="submit">Confirm</button>
      </form>
      <div className={styles.otp}>
        Didn&apos;t receive OTP??{" "}
        <a href="/" onClick={handleResendClick}>
          Resend
        </a>
      </div>
    </div>
  );
};

export default Otp;
