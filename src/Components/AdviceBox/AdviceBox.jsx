import React from "react";
import styles from "./AdviceBox.module.scss";
const AdviceBox = ({ advice, onChange }) => {
  return (
    <div className={styles["advice-box"]}>
      <h3>Advice/Note</h3>
      <textarea
        type="text"
        placeholder="How do you want users to approach the resource you provided"
        value={advice}
        rows={8}
        cols={7}
        onChange={onChange}
        className={styles["text-area"]}
      />
    </div>
  );
};

export default AdviceBox;
