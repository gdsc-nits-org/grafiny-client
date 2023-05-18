import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import styles from "./UploadBox.module.scss";
const UploadBox = ({
  files,
  handleDrop,
  handleBrowse,
  handleDelete,
  selectedCourse,
  selectedTopic,
  selectedYear,
  selectedSem,
  selectedDept,
}) => {
  const [isDropdownsSelected, setDropdownSelcted] = useState(false);
  useEffect(() => {
    if (selectedCourse && selectedTopic && selectedSem && selectedYear && selectedDept) {
      setDropdownSelcted(true);
    }
  }, [selectedCourse, selectedTopic, selectedDept, selectedSem, selectedYear]);
  return (
    <div
      className={`${styles["upload-box"]} ${
        isDropdownsSelected
          ? styles["dropdowns-selected"]
          : styles["no-dropdowns-selected"]
      }`}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className={styles["upload-icon"]}>
        <Icon icon="material-symbols:cloud-upload" />
      </div>
      <div className={styles["upload-text"]}>
        Drag & drop files or &nbsp;
        <input
          id="file-upload-input"
          className={styles["file-upload-input"]}
          type="file"
          multiple
          onChange={handleBrowse}
          disabled={
            !selectedCourse ||
            !selectedTopic ||
            !selectedDept ||
            !selectedSem ||
            !selectedYear
          }
        />
        <label htmlFor="file-upload-input" className={styles["browse-button"]}>
          Browse
        </label>
        <p>Supported formats are: JPEG, PDF, Word, PPT</p>
      </div>

      <div className={styles["uploaded-files"]}>
        {files.map((file) => (
          <div>
            <div className={styles["uploaded-file"]}>
              <div className={styles["file-name"]}>{file.name}</div>
              <Icon
                className={styles["button-delete"]}
                {...{ style: { color: "var(--gdsc-grayish-2-100)" } }}
                icon="entypo:circle-with-cross"
                onClick={() => handleDelete(file)}
              />
            </div>
            <div
              className={styles["file-progress-bar"]}
              {...{
                style: { width: `${file.progress}%` },
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadBox;
