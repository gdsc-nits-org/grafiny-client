import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import styles from "./OurTeam.module.scss";
const OurTeam = () => {
  const [teamMembers, setteamMembers] = useState([]);
  useEffect(() => {
    fetch("/db/ourteam.json")
      .then((res) => res.json())
      .then((data) => {
        setteamMembers(data);
      });
  }, []);
  return (
    <div className={styles["our-team"]}>
      <div className={styles["member-cards"]}>
        {teamMembers.map((member) => (
          <div
            className={styles["member-card"]}
            key={member.name}
            style={{ backgroundImage: `url(${member.photo})` }}
          >
            <div className={styles["member-info"]}>
              <h2>{member.name}</h2>
              <h3>{member.position}</h3>
            </div>
            <div className={styles["member-social"]}>
              <a href={`https://www.linkedin.com/in/${member.linkedin}`}>
                <Icon icon="mdi:linkedin" />
              </a>
              <a href={`https://github.com/${member.github}`}>
                <Icon icon="mdi:github" />
              </a>
              <a href={`https://github.com/${member.facebook}`}>
                <Icon icon="ic:baseline-facebook" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;
