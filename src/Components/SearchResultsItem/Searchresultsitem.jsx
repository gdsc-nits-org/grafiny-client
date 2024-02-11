import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useContext } from "react";
import style from "./searchresultsitem.module.scss";
import UserContext from "../../Global/Auth/authContext";

const SearchResultsItem = ({ item }) => {
  const context = useContext(UserContext);
  const { user } = context;
  console.log(item);
  return (
    <div className={style.itemcontainer}>
      <div className={style.leftpart}>
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
          <div className={style.heartcontainer}>
            {(!user.profile || !item.likedByIds.includes(user.profile.id)) === true ? (
              <FaRegHeart />
            ) : (
              <FaHeart />
            )}
          </div>
          <div className={style.likenumber}>{item.likedByIds.length}</div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsItem;
