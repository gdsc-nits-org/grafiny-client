import styles from "./Dropdowns.module.scss";

const Dropdown = ({
  label,
  value,
  onChangeHandler,
  disabled,
  options,
  displayFunction,
}) => {
  return (
    <div className={styles["dropdown-container"]}>
      <label htmlFor={label}>
        Select {label} <span className={styles["compulsory-field"]}>*</span>
      </label>
      <select
        id={label}
        value={value}
        onChange={(e) => {
          const selectedOption = options.find((option) => option.id === e.target.value);
          onChangeHandler(selectedOption);
        }}
        disabled={disabled}
        className={styles["dropdown-content"]}
      >
        <option value="">--Select {label}--</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {displayFunction(option)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
