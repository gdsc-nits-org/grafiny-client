import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./CoursesCard.module.scss";

const CoursesCard = ({ data }) => {
  const [BM, setBM] = useState(false);

  return (
    <div className={styles.coursesCard}>
      <button onClick={() => setBM(!BM)} onKeyDown={() => setBM(!BM)}>
        <img
          src={BM ? "/images/bmActive.png" : "/images/bookmark.png"}
          alt="bookmark"
          className={styles.coursesCardBm}
        />
      </button>
      <Link to={`/topics/${data?.link}`} className={styles.coursesLink}>
        <div className={styles.coursesCardSubject}>{data?.subjectName}</div>
      </Link>
      <img src="/images/book.png" alt="book" className={styles.coursesCardImg} />
    </div>
  );
};

export default CoursesCard;
