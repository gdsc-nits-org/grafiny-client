import { useContext, useState } from "react";
import { Icon } from "@iconify/react";
import style from "./searchresultsitem.module.scss";
import UserContext from "../../Global/Auth/authContext";
import Popup from "../Popup/popup";

const SearchResultsItem = ({ item }) => {
  const context = useContext(UserContext);
  const { user } = context;
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className={style.itemcontainer}>
      <div className={style.leftpart}>
        {showPopup && <Popup files={item.file} onClose={togglePopup} />}
        <div className={style.bookiconcontainer}>
          <img className={style.bookicon} src="/assets/bookicon.png" alt="bookicon" />
        </div>
        <div className={style.booktitlecontainer}>
          <div className={style.title}>{item.name}</div>
          <div className={style.subtitle}>
            {item.topic.course.semester.department.institution.name},{" "}
            {item.topic.course.semester.department.name}
          </div>
        </div>
      </div>
      <div className={style.rightpart}>
        <div className={style.leftitem}>{item.createdAt.split("T")[0]}</div>
        <div className={style.rightitem}>
          <div
            className={style.heartcontainer}
            onClick={togglePopup}
            onKeyDown={togglePopup}
          >
            {(!user.profile || !item.likedByIds.includes(user.profile.id)) === true ? (
              <Icon icon="uiw:arrow-down" />
            ) : (
              <Icon icon="uiw:arrow-down" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsItem;
