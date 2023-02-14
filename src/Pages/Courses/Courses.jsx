import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Courses.module.scss";
// import book from "/images/book.png";
// import bookmark from "/images/bookmark.png";
// import bookmarkA from "/images/bmActive.png";
// import backArrow from "/images/arrow.png";

const Courses = () => {
  const [coursesData, setCoursesData] = useState([]);
  const [BM, setBM] = useState(false);

  const fetchData = () => {
    fetch("/db/courses.json")
      .then((res) => res.json())
      .then((resp) => setCoursesData(resp));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.coursesHero}>
      <div className={styles.coursesTitle}>
        <div className={styles.coursesTitleHeading}>
          <Link to="/">
            <img src="/images/arrow.png" alt="left arrow" className={styles.coursesFa} />
          </Link>
          <div className={styles.coursesTitleText}>Courses</div>
        </div>
      </div>
      <div className={styles.coursesCardContainer}>
        {coursesData.map((data) => {
          return (
            <div className={styles.coursesCard}>
              <button onClick={() => setBM(!BM)} onKeyDown={() => setBM(!BM)}>
                <img
                  src={BM ? "/images/bmActive.png" : "/images/bookmark.png"}
                  alt="bookmark"
                  className={styles.coursesCardBm}
                />
              </button>
              <div className={styles.coursesCardSubject}>{data?.subjectName}</div>
              <img src="/images/book.png" alt="book" className={styles.coursesCardImg} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Courses;
