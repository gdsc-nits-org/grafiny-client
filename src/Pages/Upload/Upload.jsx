/* eslint-disable no-param-reassign */
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import styles from "./Upload.module.scss";

const UploadingPage = () => {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const [selected, setSelected] = useState(false);
  const handleDrop = (e) => {
    e.preventDefault();
    const newFiles = [...files];
    const droppedFiles = Array.from(e.dataTransfer.files);
    droppedFiles.forEach((file) => {
      file.progress = 0;
      newFiles.push(file);
    });
    setFiles(newFiles);
  };
  const handleBrowse = (e) => {
    const newFiles = [...files];
    const selectedFiles = Array.from(e.target.files);
    selectedFiles.forEach((file) => {
      file.progress = 0;
      newFiles.push(file);
    });
    setFiles(newFiles);
    setSelected(true);
  };

  // const handleDelete = (fileIndex) => {
  //   const newFiles = [...files];
  //   newFiles.splice(fileIndex, 1);
  //   setFiles(newFiles);
  // };

  const handleDelete = async (fileName) => {
    try {
      await fetch(`/api/deleteFile?fileName=${fileName}`, {
        method: "DELETE",
      });
      setUploadedFiles((prevSelectedFiles) =>
        prevSelectedFiles.filter((file) => file.name !== fileName)
      );
    } catch (error) {
      // console.error(error);
    }
  };

  const handleUpload = () => {
    const newFiles = [...files];
    let uploadedFileCount = 0;
    newFiles.forEach((file) => {
      const formData = new FormData();
      formData.append("file", file);

      // const xhr = new XMLHttpRequest();
      // xhr.open("POST", "/iuuji");
      // const formData = new FormData();
      // formData.append("file", file);
      // xhr.upload.addEventListener("progress", (e) => {
      //   if (e.lengthComputable) {
      //     file.progress = Math.round((e.loaded / e.total) * 100);
      //     setFiles([...newFiles]);
      //   }
      // });
      // xhr.onload = () => {
      //   file.progress = 100;
      //   setUploadedFiles((prevUploadedFiles) => [...prevUploadedFiles, file]);
      //   uploadedFileCount += 1;
      //   if (uploadedFileCount === newFiles.length) {
      //     // console.log('All files uploaded successfully');
      //     setFiles([]);
      //     setSelected(false);
      //   }
      // };
      // xhr.onerror = () => {
      //   // console.error(`Error uploading file ${file.name}`);
      // };
      // xhr.send(formData);
      fetch("/iuuji", {
        method: "POST",
        body: formData,
        // Progress tracking with Fetch API
        onUploadProgress: (e) => {
          if (e.lengthComputable) {
            file.progress = Math.round((e.loaded / e.total) * 100);
            setFiles([...newFiles]);
          }
        },
      })
        .then((response) => {
          if (response.ok) {
            file.progress = 100;
            setUploadedFiles((prevUploadedFiles) => [...prevUploadedFiles, file]);
            uploadedFileCount += 1;
            if (uploadedFileCount === newFiles.length) {
              setFiles([]);
              setSelected(false);
            }
          } else {
            // handle error
          }
        })
        .catch(() => {
          // handle error
        });
    });
    setUploaded(true);
  };

  return (
    <div
      className={styles["uploading-page"]}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <h1>Upload</h1>
      <div className={styles["file-upload"]}>
        <label htmlFor="file-upload-input">
          <div className={styles["upload-box"]}>
            <div className={styles["upload-icon"]}>
              <Icon icon="material-symbols:cloud-upload" />
            </div>
            <div className={styles["upload-text"]}>
              Drag & drop files or click to browse
              <p>Supported formats are: JPEG, PDF ,Word , PPT</p>
            </div>
          </div>
        </label>
        <input
          id="file-upload-input"
          className={styles["file-upload-input"]}
          type="file"
          multiple
          onChange={handleBrowse}
        />
      </div>
      <h1 className={` ${selected ? styles.uploadStatus : styles.uploadStatusHide}`}>
        Uploading-n/n files
      </h1>

      <div className={styles["uploaded-files"]}>
        {files.map((file) => (
          <div>
            <div className={styles["uploaded-file"]}>
              <div className={styles["file-name"]}>{file.name}</div>
              <Icon
                className={styles["button-delete"]}
                {...{ style: { color: "var(--gdsc-grayish-2-100)" } }}
                icon="entypo:circle-with-cross"
              />
            </div>
            <div
              className={styles["file-progress-bar"]}
              {...{ style: { width: `${file.progress}%` } }}
            ></div>

            {/* <div className={styles["file-size"]}>{Math.round(file.size / 1024)} KB</div> */}
          </div>
        ))}
      </div>

      <h1 className={` ${uploaded ? styles.uploadStatus : styles.uploadStatusHide}`}>
        Uploaded
      </h1>
      <div className={styles["uploaded-files"]}>
        {uploadedFiles.map((file) => (
          <div
            className={styles["uploaded-file"]}
            {...{ style: { marginBottom: "0.8em" } }}
          >
            <div className={styles["file-name"]}>{file.name}</div>
            <Icon
              className={styles["button-delete"]}
              icon="material-symbols:delete"
              onClick={() => handleDelete(file.name)}
            />
          </div>
        ))}
      </div>
      <div className={styles["upload-button-container"]}>
        <button className={styles["upload-button"]} onClick={handleUpload}>
          UPLOAD FILES
        </button>
      </div>
    </div>
  );
};

export default UploadingPage;
