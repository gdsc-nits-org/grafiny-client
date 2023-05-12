import React from "react";
import styles from "./OurTeamPage.module.scss";
import { OurTeam } from "../../Components";
const OurTeamPage = () => {
  return (
    <div className={styles["our-team"]}>
      <div className={styles["team-heading"]}>
        <h2>OUR TEAM</h2>
      </div>
      <OurTeam />
    </div>
  );
};

export default OurTeamPage;
