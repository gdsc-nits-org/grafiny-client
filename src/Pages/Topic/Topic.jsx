import { useLocation, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import Upload from "../Upload/Upload";
import UserContext from "../../Global/Auth/authContext";
import { Loading, Topics } from "../../Components";
import styles from "./Topics.module.scss";

const Topic = () => {
  const context = useContext(UserContext);
  const { loading, setLoading, user, auth,topic, setTopic } = context;
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  

  const handleItems = async (item) => {
    try {
      setLoading(true);
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
          semNumber: state?.semNumber,
          departmentName: state?.departmentName,
          courseName: state?.courseName,
          courseId: state?.courseId,
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
    if (!user || !state) {
      navigate("/");
      toast.error("Please Log In", { autoClose: 1200 });
    } else {
      setTopic(() => JSON.parse(localStorage.getItem("topics")));
      
    }

  }, [navigate, state, user]);

  return (
    <main className={styles.topic}>
      {loading === false ? (
        <div>
          <div className={styles.dcontainer}>
            <h2 className={styles.dhead}>Topics</h2>
            <button
              className={styles["add-dept"]}
              onClick={togglePopup}
              aria-label="Add Topics"
            >
              {showPopup ? <Icon icon="mdi:close" /> : <Icon icon="mdi:plus" />}
            </button>
          </div>
          {showPopup && (
            <Upload
              onClose={togglePopup}
              department={state?.departmentName}
              semester={state?.semNumber}
              courseId={state?.courseId}
              topicOptions={state?.topics}
            />
          )}
          <div className={styles.topicBoxContainer}>
            {topic?.map((data) => (
              <div
                onClick={() => handleItems(data)}
                onKeyDown={() => handleItems(data)}
                key={data.id}
              >
                <Topics tname={data.name} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </main>
  );
};

export default Topic;
