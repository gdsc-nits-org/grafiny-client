/* eslint-disable no-param-reassign */
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styles from "./Upload.module.scss";
import UserContext from "../../Global/Auth/authContext";
import Dropdown from "../../Components/Dropdowns/Dropdowns";
import UploadBox from "../../Components/UploadBox/UploadBox";

const UploadingPage = ({ department, semester, courseId, topic, topicOptions }) => {
  const [selectedCourseId, setSelectedCourseId] = useState(courseId || "");
  const [selectedTopic, setSelectedTopic] = useState(topic || "");
  const [selectedSem, setSelectedSem] = useState(semester || "");
  const [selectedSemId, setSelectedSemId] = useState("");
  const [selectedDept, setSelectedDept] = useState(department || "");
  const [selectedDeptId, setSelectedDeptId] = useState("");
  const [files, setFiles] = useState([]);
  const [dragBox, setDragBox] = useState(false);
  const [materialName, setMaterialName] = useState("");
  const [semesters, setSemesters] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [topics, setTopics] = useState([]);

  const { user, auth, setLoading, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const instituteId = user?.profile?.institution?.id;

  useEffect(() => {
    if (!user) {
      navigate("/");
      toast.error("Please Log In", { autoClose: 1200 });
    } else if (user.name === "") {
      navigate("/");
      toast.error("Please Log In", { autoClose: 1200 });
    } else if (!user.profile) {
      navigate("/profilecreate");
      toast.error("Please Create A Profile", { autoClose: 1200 });
    }
    const fetchDepartments = async () => {
      if (selectedDept) {
        return;
      }
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/department/getAll?id=${instituteId}`
        );
        setDepartments(response.data.msg.departments);
      } catch (error) {
        toast.error("Error fetching departments", { autoClose: 1200 });
      }
    };
    fetchDepartments();
  }, [selectedDept]);

  const handleDeptChange = async (selectedOption) => {
    setSelectedDeptId(selectedOption.id);
    setSelectedDept(selectedOption.name);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/semester/getAll?id=${selectedOption.id}`
      );
      setSemesters(response.data.msg.semesters);
    } catch (error) {
      toast.error("Error fetching semesters", { autoClose: 1200 });
    }
  };

  const handleSemesterChange = async (selectedOption) => {
    setSelectedSem(selectedOption.semNumber);
    setSelectedSemId(selectedOption.id);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/course/getAll?id=${selectedOption.id}`
      );
      setCourses(response.data.msg.courses);
    } catch (error) {
      toast.error("Error fetching courses", { autoClose: 1200 });
    }
  };

  const handleCourseChange = async (selectedOption) => {
    setSelectedCourseId(selectedOption.id);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/topic/getAll?id=${selectedOption.id}`
      );
      setTopics(response.data.msg.topics);
    } catch (error) {
      toast.error("Error fetching topics:", { autoClose: 1200 });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (!dragBox) return;
    const newFiles = [...files];
    const droppedFiles = Array.from(e.dataTransfer.files);

    droppedFiles.forEach((file) => {
      if (!newFiles.some((f) => f.name === file.name && f.size === file.size)) {
        file.progress = 0;
        newFiles.push(file);
      }
    });

    setFiles(newFiles);
  };

  const handleBrowse = (e) => {
    const newFiles = [...files];
    const selectedFiles = Array.from(e.target.files);

    selectedFiles.forEach((file) => {
      if (!newFiles.some((f) => f.name === file.name && f.size === file.size)) {
        file.progress = 0;
        newFiles.push(file);
      }
    });
    setFiles(newFiles);
  };

  const handleDelete = (file) => {
    const updatedFiles = files.filter((f) => f !== file);
    setFiles(updatedFiles);
  };

  const handleUpload = async () => {
    if (
      !selectedCourseId ||
      !selectedTopic ||
      !selectedSem ||
      !selectedDept ||
      !materialName ||
      files.length === 0
    ) {
      toast.error("Please Provide All the Details", { autoClose: 1200 });
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("file", file));
    formData.append("topicId", selectedTopic);
    formData.append("courseId", selectedCourseId);
    formData.append("topicName", selectedTopic);
    formData.append("itemName", materialName);

    try {
      setLoading(() => true);
      const token = await auth.currentUser.getIdToken(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/items/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.lengthComputable) {
              const progress = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              );
              setFiles((prevFiles) =>
                prevFiles.map((file) => ({
                  ...file,
                  progress:
                    file.name === progressEvent.target.response.name
                      ? progress
                      : file.progress,
                }))
              );
            }
          },
        }
      );
      if (response.status === 200) {
        setFiles((prevFiles) =>
          prevFiles.map((file) => ({
            ...file,
            progress: 100,
          }))
        );
        const response2 = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/profile/get?email=${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { data: data2 } = response2;
        if (data2.status !== 200) {
          setLoading(false);
          toast.error(data2.msg, { autoClose: 1200 });
        }

        const { profile } = data2.msg;
        user.profile = profile;
        window.localStorage.setItem("user", JSON.stringify(user));
        setUser(() => user);
        setLoading(() => false);
        navigate("/profile");
      } else {
        setLoading(() => false);
        toast.error("Upload failed with status:", response.status, { autoClose: 1200 });
      }
    } catch (error) {
      setLoading(() => false);
      toast.error("Error uploading file. Please Log In If You Haven'nt", {
        autoClose: 1200,
      });
    }
  };

  const handleTopicChange = async (selectedOption) => {
    setDragBox(true);
    const token = await auth.currentUser.getIdToken(true);
    if (selectedOption.isNew) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/topic/create`,
          { name: selectedOption.name, id: selectedCourseId },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          const newTopic = response.data.topic;
          setTopics((prevTopics) => [...prevTopics, newTopic]);
          setSelectedTopic(newTopic.id);
          toast.success("New topic added successfully!");
        } else {
          toast.error("Failed to add new topic");
        }
      } catch (error) {
        console.error("Error adding new topic");
      }
    } else {
      setSelectedTopic(selectedOption.id);
    }
  };

  return (
    <div className={styles["main-upload-page"]}>
      <h2>Upload</h2>
      <div className={styles["uploading-page"]}>
        <div className={styles["dropdown-containers"]}>
          <Dropdown
            label="Department"
            value={selectedDeptId}
            onChangeHandler={handleDeptChange}
            options={departments}
            displayFunction={(option) => option.name}
            disabled={department}
          />
          <Dropdown
            label="Semester"
            value={selectedSemId}
            onChangeHandler={handleSemesterChange}
            options={semesters}
            displayFunction={(option) => option.semNumber}
            disabled={semester}
          />
          <Dropdown
            label="Course"
            value={selectedCourseId}
            onChangeHandler={handleCourseChange}
            options={courses}
            displayFunction={(option) => option.name}
            disabled={courseId}
          />
          <Dropdown
            label="Topic"
            value={selectedTopic}
            onChangeHandler={handleTopicChange}
            options={topicOptions === undefined ? topics : topicOptions}
            displayFunction={(option) => option.name}
            allowAddNewTopic
          />
        </div>
        <div>
          <div className={styles["input-container"]}>
            <input
              type="text"
              placeholder="Enter Name for the Material"
              value={materialName}
              onChange={(e) => setMaterialName(e.target.value)}
            />
          </div>
          <UploadBox
            files={files}
            handleDrop={handleDrop}
            handleBrowse={handleBrowse}
            handleDelete={handleDelete}
            selectedCourse={selectedCourseId}
            selectedTopic={selectedTopic}
            selectedSem={selectedSem}
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
