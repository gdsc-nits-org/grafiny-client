import React from "react";
import styles from "./Error.module.scss";

const Error = () => {
  return (
    <div className={styles.errorHero}>
      <img src="/images/error404.jpg" alt="Error 404" className={styles.errorImg} />
    </div>
  );
};

export default Error;
