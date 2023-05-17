import React from "react";
import styles from "./Dropdowns.module.scss";

const Dropdown = ({ label, value, onChange, disabled, options, selectedCourse }) => {
  return (
    <div className={styles["dropdown-container"]}>
      <label htmlFor="course">
        {" "}
        Select {label} <span className={styles["compulsory-field"]}>*</span>{" "}
      </label>
      <select
        id="course"
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={styles["dropdown-content"]}
      >
        <option value=" ">--Select {label}--</option>
        if({label}===Topic)
        {options.map(
          (topic) =>
            Number(topic.courseId) === Number(selectedCourse) && (
              <option key={topic.id} value={topic.id}>
                {topic.name}
              </option>
            )
        )}
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
