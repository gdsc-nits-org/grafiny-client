import { useLocation, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./Topics.module.scss";
import UserContext from "../../Global/Auth/authContext";
import Topics from "../../Components/Topics/Topics";
import { Loading } from "../../Components";

const Topic = () => {
  const [topic, setTopic] = useState([]);
  const context = useContext(UserContext);
  const { loading, setLoading, user } = context;
  const { state } = useLocation();

  const navigate = useNavigate();

  const handleTopic = async () => {
    try {
      setLoading(() => true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/topic/getAll?id=${state.courseId}`
      );
      const { data } = response;
      if (data.status !== 200) {
        setLoading(() => false);
        return toast.error(data.msg, { autoClose: 1200 });
      }
      setTopic(() => data.msg.topics);
      setLoading(() => false);
      return null;
    } catch (error) {
      setLoading(() => false);
      return toast.error("Something Went Wrong", { autoClose: 1200 });
    }
  };
  const { departmentName, semNumber, courseName, courseId } = state;
  const handleItems = async (data) => {
    try {
      navigate(`/material`, {
        state: {
          topicId: data.id,
          topicName: data.name,
          semNumber,
          departmentName,
          courseName,
          courseId,
          topics: topic,
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
      handleTopic();
    }
  }, []);

  return (
    <main className={styles.topic}>
      {loading === false ? (
        <>
          <div className={styles.title}>Topics</div>
          <div className={styles.topicBoxContainer}>
            {topic?.map((data) => (
              <div
                onClick={() => handleItems(data)}
                onKeyDown={() => handleItems(data)}
                key={data.id}
                className={styles.topicBox}
              >
                <Topics tname={data.name} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </main>
  );
};

export default Topic;
