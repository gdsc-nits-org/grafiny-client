import React from "react";
import styles from "./Dropdowns.module.scss";

const Dropdown = ({ label, value, onChange, disabled, options }) => {
  return (
    <div className={styles["dropdown-container"]}>
      <label htmlFor="course"> Select {label}</label>
      <select
        id="course"
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={styles["dropdown-content"]}
      >
        <option value=" ">--Select {label}--</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
