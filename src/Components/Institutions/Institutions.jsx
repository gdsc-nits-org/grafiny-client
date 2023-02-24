import React, { useEffect, useState } from "react";
import styles from "./Institutions.module.scss";

const Institutions = () => {
  const [dummyData, setDummyData] = useState([]);

  const getData = () => {
    fetch("/db/institutions.json")
      .then((response) => response.json())
      .then((res) => {
        // console.log(res);
        setDummyData(res);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.instiMain}>
      <div className={styles.instiTitleContainer}>
        <div className={styles.instiTitle}>Institutions</div>
        <div className={styles.titleSearchBox}>
          <form>
            <input
              type="text"
              placeholder="Search Institutions"
              className={styles.titleSearchBoxSearch}
            />
            <button type="submit" className={styles.titleSearchBoxButton}>
              <i className="fa fa-search" />
            </button>
          </form>
        </div>
      </div>
      <div className={styles.instiCardContainer}>
        {dummyData.map((data) => {
          return (
            <div className={styles.instiCard}>
              <img src={data?.pfp} alt="institute logo" className={styles.instiCardImg} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Institutions;
