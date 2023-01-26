import style from "./searchresults.module.scss";

const SearchResults = () => {
  return (
    <div className={style.searchresultscontainer}>
      <div className={style.header}>
        <div className={style.heading}>Search Results</div>
        <div className={style.searchcontainer}>
          <div className={style.searchbar}>
            <div className={style.inputbox}>
              <input type="text" className={style.inputfield} placeholder="Search" />
            </div>
            <div className={style.iconcontainer}>
              <img
                src="/assets/searchicon.png"
                alt="searchicon"
                className={style.iconimg}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
