import axios from "axios";
import { useContext } from "react";
import style from "./Explore.module.scss";
import UserContext from "../../Global/Auth/authContext";

const Explore = () => {
  const context = useContext(UserContext);
  const { token } = context;
  const getI = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/institute/search?instituteName=IIT`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const parsedResponse = response.data;
    console.log(parsedResponse);
  };
  return (
    <div className={style.explorecontainer}>
      <div className={style.upperhalf}>
        <span className={style.exploretext}>Explore |</span>
        <span className={style.collegetext}>
          &nbsp;<span>Subjects</span>
        </span>
      </div>
      <div className={style.bottomhalf}>
        <div className={style.searchcontainer}>
          <div className={style.search}>
            <img className={style.img} src="/assets/exploreimg.png" alt="exploreimg" />
            <input type="text" placeholder="What are you looking for ?" />
          </div>
        </div>
        <div className={style.searchbuttoncontainer}>
          <button className={style.button} onClick={getI}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Explore;
