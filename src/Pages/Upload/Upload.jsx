/* eslint-disable no-param-reassign */
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import styles from "./Upload.module.scss";

const UploadingPage = () => {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selected, setSelected] = useState(false);
  const [buttonstate, setbuttonState] = useState(false);
  const [selectedCourse, setSelctedCourse] = useState("");
  // const [topics, setTopics] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const courseOptions = [
    { name: "Mathematics", id: 1 },
    { name: "Theory of Computation", id: 2 },
    { name: "Computer Architecture and Organization", id: 3 },
  ];

  const topicOptions = [
    { name: "Random Variables", id: 1, courseId: 1 },
    { name: "Finite Automata", id: 2, courseId: 2 },
    { name: "Pumping Lemma", id: 3, courseId: 2 },
    { name: "Paging and Segmentation", id: 4, courseId: 3 },
    { name: "Random Process", id: 5, courseId: 1 },
  ];
  const handleDrop = (e) => {
    e.preventDefault();
    const newFiles = [...files];
    const droppedFiles = Array.from(e.dataTransfer.files);
    droppedFiles.forEach((file) => {
      const isExisting = newFiles.some((existingFile) => existingFile.name === file.name);
      if (!isExisting) file.progress = 0;
      newFiles.push(file);
    });
    setFiles(newFiles);
  };
  const handleBrowse = (e) => {
    const newFiles = [...files];
    const selectedFiles = Array.from(e.target.files);
    selectedFiles.forEach((file) => {
      const isExisting = newFiles.some((existingFile) => existingFile.name === file.name);
      if (!isExisting) file.progress = 0;
      newFiles.push(file);
    });
    setFiles(newFiles);
    setSelected(true);
    setbuttonState(true);
  };

  const handleDeleteUploaded = async (fileName) => {
    // try {
    //   await fetch(`/api/deleteFile?fileName=${fileName}`, {
    //     method: "DELETE",
    //   });
    setUploadedFiles((prevSelectedFiles) =>
      prevSelectedFiles.filter((file) => file.name !== fileName)
    );
    // } catch (error) {
    //   // console.error(error);
    // }
  };
  const navigate = useNavigate();
  const handleDelete = (file) => {
    const newFiles = files.filter((f) => f.name !== file.name);
    setFiles(newFiles);
  };
  let uploadedFileCount = 0;
  const handleUpload = () => {
    const newFiles = [...files];

    newFiles.forEach((file) => {
      // const formData = new FormData();
      // formData.append("file", file);

      // Temporary: XML HTTP Request
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/iuuji");
      const formData = new FormData();
      formData.append("file", file);
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          file.progress = Math.round((e.loaded / e.total) * 100);
          setFiles([...newFiles]);
        }
      });
      xhr.onload = () => {
        file.progress = 100;
        setUploadedFiles((prevUploadedFiles) => [...prevUploadedFiles, file]);
        uploadedFileCount += 1;
        if (uploadedFileCount === newFiles.length) {
          setFiles([]);
          setSelected(false);
          navigate("/profile");
        }
      };
      xhr.onerror = () => {};
      xhr.send(formData);
    });
    setUploaded(true);
    // end of temporary code

    // Using fetch api
    // fetch("/iuuji", {
    //   method: "POST",
    //   body: formData,
    //   // Progress tracking with Fetch API
    //   onUploadProgress: (e) => {
    //     if (e.lengthComputable) {
    //       file.progress = Math.round((e.loaded / e.total) * 100);
    //       setFiles([...newFiles]);
    //     }
    //   },
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //       file.progress = 100;
    //       setUploadedFiles((prevUploadedFiles) => [...prevUploadedFiles, file]);
    //       uploadedFileCount += 1;
    //       if (uploadedFileCount === newFiles.length) {
    //         setFiles([]);
    //         setSelected(false);
    //       }
    //     } else {
    //       // handle error
    //     }
    //   })
    //   .catch(() => {
    //     // handle error
    //   });
  };
  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    setSelctedCourse(courseId);
    setbuttonState(false);
    // fetch(`/api/topics?courseId=${courseId}`)
    //   .then((response) => response.json())
    //   .then((data) => setTopics(data));
  };
  const handleTopicChange = (e) => {
    const topicId = e.target.value;
    setSelectedTopic(topicId);
  };

  return (
    <div className={styles["main-upload-page"]}>
      <div
        className={styles["uploading-page"]}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <h1>Upload</h1>

        <div className={styles["dropdown-container"]}>
          <label htmlFor="course">Select Course</label>
          <select
            id="course"
            value={selectedCourse}
            onChange={handleCourseChange}
            disabled={files.length}
          >
            <option value=" ">--SELECT COURSE--</option>
            {courseOptions.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
            ;
          </select>
        </div>

        <div className={styles["dropdown-container"]}>
          <label htmlFor="topic">Select Topic</label>
          <select
            id="topic"
            value={selectedTopic}
            onChange={handleTopicChange}
            disabled={!selectedCourse || selected}
          >
            <option value=" ">--SELECT TOPIC--</option>
            {topicOptions.map(
              (topic) =>
                Number(topic.courseId) === Number(selectedCourse) && (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                )
            )}
          </select>
        </div>

        <div
          className={`${
            files.length > 0 || uploaded ? styles["file-uploaded"] : styles["file-upload"]
          }`}
        >
          <label htmlFor="file-upload-input">
            <div className={styles["upload-box"]}>
              <div className={styles["upload-icon"]}>
                <Icon icon="material-symbols:cloud-upload" />
              </div>
              <div className={styles["upload-text"]}>
                Drag & drop files or click to browse
                <p>Supported formats are: JPEG, PDF, Word, PPT</p>
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

        <h1
          className={` ${
            selected && files.length > 0 ? styles.uploadStatus : styles.uploadStatusHide
          }`}
        >
          Uploading-{uploadedFileCount}/{files.length} files
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
                  onClick={() => handleDelete(file)}
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

        <h1
          className={` ${
            uploadedFiles.length > 0 && uploaded
              ? styles.uploadStatus
              : styles.uploadStatusHide
          }`}
        >
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
                onClick={() => handleDeleteUploaded(file.name)}
              />
            </div>
          ))}
        </div>
        <div className={styles["upload-button-container"]}>
          <button
            className={`{ ${
              !buttonstate || uploaded
                ? styles["disabled-upload-button"]
                : styles["upload-button"]
            }`}
            onClick={handleUpload}
          >
            UPLOAD
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadingPage;
