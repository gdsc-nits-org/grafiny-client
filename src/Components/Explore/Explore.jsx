import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import style from "./Explore.module.scss";
import UserContext from "../../Global/Auth/authContext";
import Loading from "../Loading/Loading";

const Explore = () => {
  const context = useContext(UserContext);
  const [value, setValue] = useState("");
  const { user, loading, setLoading, auth } = context;
  const navigate = useNavigate();
  const searchItems = async () => {
    try {
      if (!user || user.name === "") {
        return toast.error("Please log in to continue", { autoClose: 1200 });
      }
      if (!value) {
        return toast.error("Search field cannot be empty", { autoClose: 1200 });
      }
      setLoading(() => true);

      const token = await auth?.currentUser?.getIdToken(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/items/search?name=${value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = response;
      setLoading(() => false);
      if (data.status !== 200) {
        return toast.error(data.msg, { autoClose: 1200 });
      }
      if (data.msg.items.length === 0) {
        return toast.info("No results found", { autoClose: 1200 });
      }
      navigate("/searchresults", {
        state: {
          items: data.msg.items,
        },
      });

      return null;
    } catch (err) {
      setLoading(false);
      return toast.error(err, {
        autoClose: 1200,
      });
    }
  };
  return (
    <div>
      {loading === false ? (
        <div className={style.explorecontainer}>
          <div className={style.upperhalf}>
            <span className={style.exploretext}>Explore |</span>
            <span className={style.collegetext}>
              &nbsp;<span>Materials</span>
            </span>
          </div>
          <div className={style.bottomhalf}>
            <div className={style.searchcontainer}>
              <div className={style.search}>
                <img
                  className={style.img}
                  src="/assets/exploreimg.png"
                  alt="exploreimg"
                />
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="What are you looking for?"
                />
              </div>
            </div>
            <div className={style.searchbuttoncontainer}>
              <button className={style.button} onClick={searchItems}>
                Search
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Explore;
