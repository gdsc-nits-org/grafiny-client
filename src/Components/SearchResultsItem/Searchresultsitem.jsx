import style from "./searchresultsitem.module.scss";

const SearchResultsItem = () => {
  return (
    <div className={style.itemcontainer}>
      <div className={style.leftpart}>
        <div className={style.bookiconcontainer}>
          <img className={style.bookicon} src="/assets/bookicon.png" alt="bookicon" />
        </div>
        <div className={style.booktitlecontainer}>
          <div className={style.title}>Course/Subject</div>
          <div className={style.subtitle}>College,Department</div>
        </div>
      </div>
      <div className={style.rightpart}>
        <div className={style.leftitem}>00/00/0000</div>
        <div className={style.rightitem}>
          <div className={style.heartcontainer}>
            <img className={style.heartimg} src="/assets/heart.png" alt="hearticon" />
          </div>
          <div className={style.likenumber}>0</div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsItem;
