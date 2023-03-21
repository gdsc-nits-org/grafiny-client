import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./RecoveryCode.module.scss";

const RecoveryCode = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const refs = useRef([]);
  const handleChange = (e, index) => {
    if (Number.isNaN(Number(e.target.value))) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? e.target.value : d))]);
    if (e.target.nextSibling && e.target.value !== "") {
      e.target.nextSibling.focus();
    }
    return true;
  };
  const handleKeyUp = (e) => {
    if (e.key === "Backspace" && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
    return true;
  };

  const inputIds = Array(6)
    .fill()
    .map(() => uuidv4());

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.heading}>VERIFICATION</h3>
      <p className={styles.recoverymessage}>Enter the OTP.</p>
      <form>
        <div className={styles.otpfield}>
          {otp.map((data, index) => (
            <input
              className={styles.otp}
              type="text"
              maxLength="1"
              key={inputIds[index]}
              value={data}
              onChange={(e) => handleChange(e, index)}
              onKeyUp={(e) => handleKeyUp(e, index)}
              ref={(ref) => {
                refs.current[index] = ref;
              }}
            />
          ))}
          <a className={styles.resendotp} href="/">
            Resend OTP
          </a>
          <div className={styles.gap}></div>
        </div>
        <button type="submit" className={styles.button}>
          Verify
        </button>
      </form>
    </div>
  );
};

export default RecoveryCode;
