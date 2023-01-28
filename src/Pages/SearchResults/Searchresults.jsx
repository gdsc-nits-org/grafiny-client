import style from "./searchresults.module.scss";
import { SearchResultsItem } from "../../Components";

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
      <div className={style.columnheadingcontainer}>
        <div className={style.leftcolumn}>Name &uarr;</div>
        <div className={style.rightcolumn}>
          <div className={style.leftitem}>Last Modified</div>
          <div className={style.rightitem}>Likes</div>
        </div>
      </div>
      <div className={style.searchitemscontainer}>
        <SearchResultsItem />
        <SearchResultsItem />
        <SearchResultsItem />
        <SearchResultsItem />
        <SearchResultsItem />
        <SearchResultsItem />
      </div>
    </div>
  );
};

export default SearchResults;
