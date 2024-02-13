import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./CoursesCard.module.scss";

const CoursesCard = ({ data }) => {
  const [BM, setBM] = useState(false);

  return (
    <div className={styles.coursesCard}>
      <div onClick={() => setBM(!BM)} onKeyDown={() => setBM(!BM)}>
        <img
          src={BM ? "/images/bmActive.png" : "/images/bookmark.png"}
          alt="bookmark"
          className={styles.coursesCardBm}
        />
      </div>

      <Link to={`/topics/${data.id}`} className={styles.coursesLink}>
        <div className={styles.coursesCardContent}>
          <div className={styles.coursesCardTitle}>{data.name}</div>
          <div className={styles.coursesCardCode}>{data.code}</div>
        </div>
        <img src="/images/book.png" alt="book" className={styles.coursesCardImg} />
      </Link>
    </div>
  );
};

export default CoursesCard;
