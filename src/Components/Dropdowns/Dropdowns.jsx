import React from "react";
import styles from "./Dropdowns.module.scss";

const Dropdown = ({ label, value, onChange, disabled, options, selectedCourse }) => {
  let newOptions = options;
  if (label === "Topic") {
    newOptions = options.filter(
      (topic) => Number(topic.courseId) === Number(selectedCourse)
    );
  }
  return (
    <div className={styles["dropdown-container"]}>
      <label htmlFor="course">
        Select {label} <span className={styles["compulsory-field"]}>*</span>
      </label>
      <select
        id="course"
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={styles["dropdown-content"]}
      >
        <option value=" ">--Select {label}--</option>
        {newOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
