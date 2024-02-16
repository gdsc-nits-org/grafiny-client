import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";
import { toast } from "react-toastify";
import { CreateCourse, Loading } from "../../Components";
import UserContext from "../../Global/Auth/authContext";
import CoursesCard from "./CoursesCard";
import styles from "./Courses.module.scss";

const Courses = () => {
  const [coursesData, setCoursesData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const context = useContext(UserContext);
  const { loading, setLoading, user } = context;

  const { state } = useLocation();

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const navigate = useNavigate();

  const handleCourse = async () => {
    try {
      setLoading(() => true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/course/getAll?id=${state.semId}`
      );
      const { data } = response;
      if (data.status !== 200) {
        setLoading(() => false);
        return toast.error(data.msg, { autoClose: 1200 });
      }
      setCoursesData(() => data.msg.courses);
      setLoading(() => false);
      return null;
    } catch (error) {
      console.error(error);
      setLoading(() => false);
      return toast.error("Something Went Wrong", { autoClose: 1200 });
    }
  };
  const handleTopic = async (data) => {
    try {
      navigate(`/topics`, {
        state: {
          courseId: data.id,
        },
      });
      return null;
    } catch (error) {
      return toast.error("Something Went Wrong", { autoClose: 1200 });
    }
  };
  useEffect(() => {
    if (!user) {
      toast.error("Please Log In", { autoClose: 1200 });
    } else if (!state) {
      navigate("/");
    } else {
      handleCourse();
    }
  }, []);

  return (
    <div className={styles.coursesHero}>
      {loading === false ? (
        <div>
          <div className={styles.coursesTitle}>
            <div className={styles.arrowContainer}>
              <Icon
                icon="mdi:arrow-left"
                onClick={() => navigate(-1)}
                className={styles.arrow}
              />
              <h2 className={styles.dhead}>Courses</h2>
              <button
                className={styles["add-courses"]}
                onClick={togglePopup}
                aria-label="Add Department"
              >
                {showPopup ? <Icon icon="mdi:close" /> : <Icon icon="mdi:plus" />}
              </button>
            </div>
            {showPopup && (
              <CreateCourse
                onClose={togglePopup}
                semNumber={state.semNumber}
                semId={state.semId}
              />
            )}
          </div>
          <div className={styles.coursesCardContainer}>
            {coursesData?.map((data) => (
              <div
                onClick={() => handleTopic(data)}
                onKeyDown={() => handleTopic(data)}
                key={data.id}
                className={styles.coursesCard}
              >
                <CoursesCard data={data} />;
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Courses;
