import React from 'react';
import style from './Explore.module.scss';
import image from './exploreimg.png';

export default function Explore() {
  return (
    <div className={style.explorecontainer}>
      <div className={style.upperhalf}>
        <span className={style.exploretext}>
          Explore |
        </span>
        <span className={style.collegetext}>
          &nbsp;Colleges
        </span>
      </div>
      <div className={style.bottomhalf}>
        <div className={style.searchcontainer}>
        <div className={style.img}>
           <img src={image} alt="" />
        </div>
      <div className={style.search}>
        <input type="text" placeholder='What are you looking for ?' />
      </div>
      </div>
      <div className={style.searchbutton}>
          Search
      </div>
      </div>
    </div>
  )
}
