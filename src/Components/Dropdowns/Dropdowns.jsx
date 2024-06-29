import styles from "./Dropdowns.module.scss";

const Dropdown = ({ label, value, onChange, disabled, options }) => {
  return (
    <div className={styles["dropdown-container"]}>
      <label htmlFor={label}>
        Select {label} <span className={styles["compulsory-field"]}>*</span>
      </label>
      <select
        id={label}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={styles["dropdown-content"]}
      >
        <option value="">--Select {label}--</option>
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
