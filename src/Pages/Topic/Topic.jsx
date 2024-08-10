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
  const { loading, setLoading, user, auth } = context;
  const { state } = useLocation();

  const navigate = useNavigate();

  const departmentName = state?.departmentName;
  const semNumber = state?.semNumber;
  const courseName = state?.courseName;
  const courseId = state?.courseId;

  const handleItems = async (item) => {
    try {
      setLoading(() => true);
      const token = await auth?.currentUser?.getIdToken(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/items/allitems?id=${item.id}`,
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
      navigate(`/material`, {
        state: {
          topicId: item.id,
          topicName: item.name,
          semNumber,
          departmentName,
          courseName,
          courseId,
          topics: topic,
          items: data.msg.items,
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
      setTopic(() => state?.topics);
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
