import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { CreateCourse } from "../../Components";
import CoursesCard from "./CoursesCard";
import styles from "./Courses.module.scss";

const Courses = () => {
  const [coursesData, setCoursesData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  // const [BM, setBM] = useState(false);

  const { state } = useLocation();
  console.log(state.courses);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const fetchData = () => {
    fetch("/db/coursesRayyan.json")
      .then((res) => res.json())
      .then((resp) => setCoursesData(resp));
  };

  useEffect(() => {
    fetchData();
  }, []);
  const navigate = useNavigate();
  return (
    <div className={styles.coursesHero}>
      <div className={styles.coursesTitle}>
        <div className={styles.coursesTitleHeading}>
          <Icon
            icon="mdi:arrow-left"
            color="rgb(116, 114, 114)"
            className={styles.dleftarrow}
            onClick={() => navigate(-1)}
          />
          <div className={styles.coursesTitleText}>Courses</div>
          <button
            className={styles["add-courses"]}
            onClick={togglePopup}
            aria-label="Add Department"
          >
            {showPopup ? <Icon icon="mdi:close" /> : <Icon icon="mdi:plus" />}
          </button>
        </div>
        {showPopup && <CreateCourse onClose={togglePopup} />}
      </div>
      <div className={styles.coursesCardContainer}>
        {coursesData.map((data) => {
          return <CoursesCard data={data} />;
        })}
      </div>
    </div>
  );
};

export default Courses;
