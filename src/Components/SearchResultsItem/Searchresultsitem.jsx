import style from "./searchresultsitem.module.scss";

const SearchResultsItem = ({ item }) => {
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
            <img className={style.heartimg} src="/assets/heart.png" alt="hearticon" />
          </div>
          <div className={style.likenumber}>{item.likedByIds.length}</div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsItem;
