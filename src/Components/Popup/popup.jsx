import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UserContext from "../../Global/Auth/authContext";
import style from "./Popup.module.scss";

const Popup = ({ onClose }) => {
  const { auth } = useContext(UserContext);
  const context = useContext(UserContext);
  const [items, setItems] = useState([]);
  const { state } = useLocation();
  const { user } = context;
  const navigate = useNavigate();

  const handleItems = async () => {
    try {
      //   setLoading(true);
      const token = await auth.currentUser.getIdToken(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/items/searchinTopic?id=${state.topicId}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      if (data.status !== 200) {
        // setLoading(false);
        return toast.error(data.msg, { autoClose: 1200 });
      }
      setItems(data.msg.items);
      //   setLoading(false);
      return null;
    } catch (error) {
      //   setLoading(false);
      return toast.error("Something Went Wrong", { autoClose: 1200 });
    }
  };

  useEffect(() => {
    if (!user) {
      toast.error("Please Log In", { autoClose: 1200 });
    } else if (!state) {
      navigate("/");
    } else {
      handleItems();
    }
  }, [user, state, navigate]);

  return (
    <div className={style.container}>
      <div className={style.buttoncont}>
        <button className={style.button} onClick={onClose}>
          Close
        </button>
      </div>
      <div className={style.filecontainer}>
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className={style.file}>
              {item.name}{" "}
              <a href={item.url} download>
                Download
              </a>
            </div>
          ))
        ) : (
          <div>No files available</div>
        )}
      </div>
    </div>
  );
};

export default Popup;
