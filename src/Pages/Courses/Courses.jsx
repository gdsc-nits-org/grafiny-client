import { useState, useEffect, useContext } from "react";
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
  const { loading, setLoading, user, auth } = context;

  const { state } = useLocation();

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const navigate = useNavigate();

  const departmentName = state?.departmentName;
  const semNumber = state?.semNumber;

  const handleTopic = async (item) => {
    try {
      setLoading(() => true);
      const token = await auth?.currentUser?.getIdToken(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/topic/getAll?id=${item.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      if (data.status !== 200) {
        setLoading(() => false);
        return toast.error(data.msg, { autoClose: 1200 });
      }
      setLoading(() => false);
      navigate(`/topics`, {
        state: {
          courseId: item.id,
          courseName: item.name,
          semNumber,
          departmentName,
          topics: data.msg.topics,
        },
      });
      return null;
    } catch (error) {
      return toast.error("Something Went Wrong. Please Log In If You Have'nt", {
        autoClose: 1200,
      });
    }
  };
  useEffect(() => {
    if (!user) {
      navigate("/");
      toast.error("Please Log In", { autoClose: 1200 });
    } else if (!state) {
      navigate("/");
      toast.error("Please Log In", { autoClose: 1200 });
    } else {
      setCoursesData(() => state?.courses);
    }
  }, []);

  return (
    <div className={styles.coursesHero}>
      {loading === false ? (
        <div>
          <div className={styles.coursesTitle}>
            <div className={styles.arrowContainer}>
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
                semNumber={state?.semNumber}
                semId={state?.semId}
                coursesData={coursesData}
                setCoursesData={setCoursesData}
                setLoading={setLoading}
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
                <CoursesCard data={data} />
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
