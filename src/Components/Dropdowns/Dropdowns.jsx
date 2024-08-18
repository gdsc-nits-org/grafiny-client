import { useState } from "react";
import { toast } from "react-toastify";
import styles from "./Dropdowns.module.scss";

const Dropdown = ({
  label,
  value,
  onChangeHandler,
  disabled,
  options,
  displayFunction,
  allowAddNewTopic = false,
}) => {
  const [isAddingNewTopic, setIsAddingNewTopic] = useState(false);
  const [newTopic, setNewTopic] = useState("");

  const handleAddNewTopic = async (e) => {
    e.preventDefault();
    if (newTopic.trim()) {
      const existingOption = options.find(
        (option) => displayFunction(option) === newTopic.trim()
      );

      if (existingOption) {
        toast.warning("Topic already exists", { autoClose: 1200 });
        onChangeHandler(existingOption);
      } else {
        const newOption = { id: newTopic, name: newTopic, isNew: true };
        onChangeHandler(newOption);
      }
      setNewTopic("");
      setIsAddingNewTopic(false);
    }
  };

  return (
    <div className={styles["dropdown-container"]}>
      <label htmlFor={label}>
        Select {label} <span className={styles["compulsory-field"]}>*</span>
      </label>
      <select
        id={label}
        value={value}
        onChange={(e) => {
          if (e.target.value === "add-new") {
            setIsAddingNewTopic(true);
          } else {
            const selectedOption = options.find((option) => option.id === e.target.value);
            onChangeHandler(selectedOption);
          }
        }}
        disabled={disabled}
        className={styles["dropdown-content"]}
      >
        <option value="">--Select {label}--</option>
        {options?.map((option) => (
          <option key={option.id} value={option.id}>
            {displayFunction(option)}
          </option>
        ))}
        {allowAddNewTopic && <option value="add-new">Add New Topic</option>}
      </select>
      {isAddingNewTopic && (
        <form onSubmit={handleAddNewTopic} className={styles["add-new-topic-form"]}>
          <input
            type="text"
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
            placeholder="Enter a new topic name"
          />
          <button type="submit">Add</button>
        </form>
      )}
    </div>
  );
};

export default Dropdown;
