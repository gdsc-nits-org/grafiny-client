import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import UserContext from "../../Global/Auth/authContext";
import { Materials } from "../../Components";
import Loading from "../../Components/Loading/Loading";
import style from "./Material.module.scss";

const Matetial = () => {
  const { auth } = useContext(UserContext);
  const { state } = useLocation();
  const context = useContext(UserContext);
  const [items, setItems] = useState([]);
  const { loading, setLoading, user } = context;
  const navigate = useNavigate();
  // const [showPopup, setShowPopup] = useState(false);

  const navigateTo = () => {
    navigate(-1);
  };

  // const togglePopup = () => {
  //   setShowPopup(!showPopup);
  // };

  const handleItems = async () => {
    try {
      setLoading(() => true);
      const token = await auth.currentUser.getIdToken(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/items/allitems?id=${state.topicId}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      if (data.status !== 200) {
        setLoading(() => false);
        return toast.error(data.msg, { autoClose: 1200 });
      }
      setItems(() => data.msg.items);
      setLoading(() => false);
      return null;
    } catch (error) {
      // console.error(error);
      setLoading(() => false);
      return toast.error("Something Went Wrong", { autoClose: 1200 });
    }
  };

  // const handleFiles = async (data) => {
  //   try {
  //     navigate(`/`, {
  //       state: {
  //         fileId: data.id,
  //         fileUrl: data.url,
  //       },
  //     });
  //     return null;
  //   } catch (error) {
  //     return toast.error("Something Went Wrong", { autoClose: 1200 });
  //   }
  // };

  useEffect(() => {
    if (!user) {
      toast.error("Please Log In", { autoClose: 1200 });
    } else if (!state) {
      navigate("/");
    } else {
      handleItems();
    }
  }, []);

  return (
    <section className={style.material}>
      {loading === false ? (
        <div>
          <div className={style.arrowContainer}>
            <Icon icon="mdi:arrow-left" onClick={navigateTo} className={style.arrow} />
            <h2 className={style.dhead}>Materials</h2>
            {/* <button
              className={style["add-sem"]}
              onClick={togglePopup}
              aria-label="Add Department"
            >
              {showPopup ? <Icon icon="mdi:close" /> : <Icon icon="mdi:plus" />}
            </button> */}
          </div>
          <div className={style.itemsContainer}>
            {items?.map((item) => (
              <div
                //  onClick={() => handleCourse(item)}
                //  onKeyDown={() => handleCourse(item)}
                key={item.id}
              >
                <Materials name={item.name} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </section>
  );
};

export default Matetial;
