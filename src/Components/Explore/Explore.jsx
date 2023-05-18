import React from "react";
import style from "./Explore.module.scss";

const Explore = () => {
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
          <div className={style.button}>Search</div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
