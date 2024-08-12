import { useState } from "react";
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
      <div className={styles.coursesCardContent}>
        <div>
          {data.code}
          <span> - </span>
          {data.name}
        </div>
      </div>
      <img src="/images/book.png" alt="book" className={styles.coursesCardImg} />
    </div>
  );
};

export default CoursesCard;
