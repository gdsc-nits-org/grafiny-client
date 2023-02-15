import { useState } from "react";
import style from "./searchresults.module.scss";
import { SearchResultsItem } from "../../Components";

const SearchResults = () => {
  const [courses, setCourses] = useState(() => []);
  const [course, setCourse] = useState(() => "");

  const fetchCourses = async () => {
    const data = await fetch("/db/courses.json");
    const rData = await data.json();
    const regularExp = new RegExp(`${course}`);
    const requiredCourses = rData.filter((item) =>
      regularExp.test(item.name.toLowerCase())
    );
    setCourses(() => requiredCourses);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchCourses();
    }
  };

  return (
    <div className={style.searchresultscontainer}>
      <div className={style.header}>
        <div className={style.heading}>Search Results</div>
        <div className={style.searchcontainer}>
          <div className={style.searchbar}>
            <div className={style.inputbox}>
              <input
                type="text"
                className={style.inputfield}
                placeholder="Search"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                onKeyDown={handleKeyPress}
              />
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
        {courses.map((item) => (
          <SearchResultsItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
