/* eslint-disable no-param-reassign */
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import styles from "./Upload.module.scss";

const UploadingPage = () => {
  const [files, setFiles] = useState([]);
  const [selected, setSelected] = useState(false);
  const [selectedCourse, setSelctedCourse] = useState("");
  const [selectedDept, setSelctedDept] = useState("");
  const [selectedSem, setSelctedSem] = useState("");
  // const [topics, setTopics] = useState([]);
  // const [uploadedFiles, setUploadedFiles] = useState([]);
  // const [uploaded, setUploaded] = useState(false);
  const [dragBox, setdragBox] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [advice, setAdvice] = useState("");

  const courseOptions = [
    { name: "Mathematics", id: 1 },
    { name: "Theory of Computation", id: 2 },
    { name: "Computer Architecture and Organization", id: 3 },
  ];

  const yearofPassing = [
    { year: "2024", id: 1 },
    { year: "2025", id: 2 },
    { year: "2026", id: 3 },
  ];
  const semesters = [
    { sems: "1st", id: 1 },
    { sems: "2nd", id: 2 },
    { sems: "3rd", id: 3 },
    { sems: "4th", id: 4 },
    { sems: "5th", id: 5 },
    { sems: "6th", id: 6 },
  ];
  const departments = [
    { deps: "CSE", id: 1 },
    { deps: "ECE", id: 2 },
    { deps: "EE", id: 3 },
    { deps: "EIE", id: 4 },
    { deps: "ME", id: 5 },
    { deps: "CE", id: 6 },
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
    if (!dragBox) return;
    const newFiles = [...files];
    const droppedFiles = Array.from(e.dataTransfer.files);
    droppedFiles.forEach((file) => {
      file.progress = 0;
      newFiles.push(file);
    });

    setdragBox(false);
    setFiles(newFiles);
    setSelected(true);
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
    setdragBox(false);
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
        // setUploadedFiles((prevUploadedFiles) => [...prevUploadedFiles, file]);
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
    // setUploaded(true);
  };
  // end of temporary code

  // Using fetch api
  // fetch("/iuuji", {
  //   method: "POST",
  //   body: formData,
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
  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    setSelctedCourse(courseId);
    // setbuttonState(false);
    // fetch(`/api/topics?courseId=${courseId}`)
    //   .then((response) => response.json())
    //   .then((data) => setTopics(data));
  };
  const handleTopicChange = (e) => {
    const topicId = e.target.value;
    setSelectedTopic(topicId);
    setdragBox(true);
  };

  return (
    <div className={styles["main-upload-page"]}>
      <h1>Upload</h1>

      <div
        className={styles["uploading-page"]}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className={styles["dropdown-containers"]}>
          <div className={styles["dropdown-container"]}>
            <label htmlFor="course">Select Department</label>
            <select
              id="course"
              value={selectedDept}
              onChange={(e) => {
                setSelctedDept(e.target.value);
              }}
              disabled={files.length}
              className={styles["dropdown-content"]}
            >
              <option value=" ">--SELECT Department--</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.deps}
                </option>
              ))}
              ;
            </select>
          </div>

          <div className={styles["dropdown-container"]}>
            <label htmlFor="course">Select Semester</label>
            <select
              id="course"
              value={selectedSem}
              onChange={(e) => {
                setSelctedSem(e.target.value);
              }}
              disabled={files.length}
              className={styles["dropdown-content"]}
            >
              <option value=" ">--SELECT SEMESTER--</option>
              {semesters.map((sem) => (
                <option key={sem.id} value={sem.id}>
                  {sem.sems}
                </option>
              ))}
              ;
            </select>
          </div>

          <div className={styles["dropdown-container"]}>
            <label htmlFor="course">Select Year</label>
            <select
              id="course"
              value={selectedCourse}
              onChange={handleCourseChange}
              disabled={files.length}
              className={styles["dropdown-content"]}
            >
              <option value=" ">--SELECT YEAR--</option>
              {yearofPassing.map((year) => (
                <option key={year.id} value={year.id}>
                  {year.year}
                </option>
              ))}
              ;
            </select>
          </div>

          <div className={styles["dropdown-container"]}>
            <label htmlFor="course">Select Course</label>
            <select
              id="course"
              value={selectedCourse}
              onChange={handleCourseChange}
              disabled={files.length}
              className={styles["dropdown-content"]}
            >
              <option value=" ">--SELECT COURSE--</option>
              {courseOptions.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles["dropdown-container"]}>
            <label htmlFor="topic">Select Topic</label>
            <select
              id="topic"
              value={selectedTopic}
              onChange={handleTopicChange}
              disabled={!selectedCourse || selected}
              className={styles["dropdown-content"]}
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
        </div>

        <div className={styles["right-upload"]}>
          <div className={styles["advice-box"]}>
            <h3>Advice/Note</h3>
            <textarea
              type="text"
              placeholder="How do you want users to approach the resource you provided"
              value={advice}
              rows={8}
              cols={7}
              onChange={(e) => setAdvice(e.target.value)}
              className={styles["text-area"]}
            />
          </div>

          <div className={styles["upload-box"]}>
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
                disabled={!selectedCourse || !selectedTopic}
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

                  {/* <div className={styles["file-size"]}>{Math.round(file.size / 1024)} KB</div> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button className={styles["upload-button"]} onClick={handleUpload}>
        UPLOAD FILES
      </button>
    </div>
  );
};
export default UploadingPage;
