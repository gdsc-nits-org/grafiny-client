/* eslint-disable no-param-reassign */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Upload.module.scss";
import Dropdown from "../../Components/Dropdowns/Dropdowns";
import AdviceBox from "../../Components/AdviceBox/AdviceBox";
import UploadBox from "../../Components/UploadBox/UploadBox";

const UploadingPage = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSem, setSelectedSem] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [advice, setAdvice] = useState("");
  const [files, setFiles] = useState([]);
  const [dragBox, setdragBox] = useState(false);

  const navigate = useNavigate();
  const Semesters = [
    { name: "1st", id: 1 },
    { name: "2nd", id: 2 },
    { name: "3rd", id: 3 },
    { name: "4th", id: 4 },
    { name: "5th", id: 5 },
    { name: "6th", id: 6 },
  ];
  const Departments = [
    { name: "CSE", id: 1 },
    { name: "ECE", id: 2 },
    { name: "EE", id: 3 },
    { name: "EIE", id: 4 },
    { name: "ME", id: 5 },
    { name: "CE", id: 6 },
  ];
  const Topics = [
    { name: "Random Variables", id: 1, courseId: 1 },
    { name: "Finite Automata", id: 2, courseId: 2 },
    { name: "Pumping Lemma", id: 3, courseId: 2 },
    { name: "Paging and Segmentation", id: 4, courseId: 3 },
    { name: "Random Process", id: 5, courseId: 1 },
  ];
  const Courses = [
    { name: "Mathematics", id: 1 },
    { name: "Theory of Computation", id: 2 },
    { name: "Computer Architecture and Organization", id: 3 },
  ];
  const Years = [
    { name: "2024", id: 1 },
    { name: "2025", id: 2 },
    { name: "2026", id: 3 },
  ];

  const handleAdviceChange = (e) => {
    setAdvice(e.target.value);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    if (!dragBox) return;
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
  };

  const handleDelete = (file) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };

  let uploadedFileCount = 0;
  const handleUpload = () => {
    const newFiles = [...files];
    newFiles.forEach((file, index) => {
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
        newFiles[index] = file;
        uploadedFileCount += 1;
        if (uploadedFileCount === newFiles.length) {
          setFiles([]);
          navigate("/profile");
        }
      };
      xhr.onerror = () => {};
      xhr.send(formData);
    });
  };

  return (
    <div className={styles["main-upload-page"]}>
      <h2>Upload</h2>
      <div className={styles["uploading-page"]}>
        <div className={styles["dropdown-containers"]}>
          <Dropdown
            label="Department"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            options={Departments}
          />
          <Dropdown
            label="Semester"
            value={selectedSem}
            onChange={(e) => setSelectedSem(e.target.value)}
            options={Semesters}
          />
          <Dropdown
            label="Year"
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
            }}
            options={Years}
          />
          <Dropdown
            label="Course"
            value={selectedCourse}
            onChange={(e) => {
              setSelectedCourse(e.target.value);
            }}
            options={Courses}
            disabled={!selectedDept || !selectedSem}
          />
          <Dropdown
            label="Topic"
            value={selectedTopic}
            onChange={(e) => {
              setSelectedTopic(e.target.value);
              setdragBox(true);
            }}
            options={Topics}
            disabled={!selectedCourse}
          />
        </div>
        <div className={styles["right-upload"]}>
          <AdviceBox
            advice={advice}
            onChange={handleAdviceChange}
            className={styles["advice-box-main"]}
          />
          <UploadBox
            files={files}
            handleDrop={handleDrop}
            handleBrowse={handleBrowse}
            handleDelete={handleDelete}
            selectedCourse={selectedCourse}
            selectedTopic={selectedTopic}
            selectedSem={selectedSem}
            selectedYear={selectedYear}
            selectedDept={selectedDept}
          />
        </div>
      </div>

      <button className={styles["upload-button"]} onClick={handleUpload}>
        UPLOAD FILES
      </button>
    </div>
  );
};
export default UploadingPage;
