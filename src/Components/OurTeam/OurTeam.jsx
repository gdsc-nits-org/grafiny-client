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
              {member.linkedin && (
                <a
                  href={`https://www.linkedin.com/in/${member.linkedin}`}
                  aria-label="linkedin"
                  className={`${styles["social-icons"]} ${styles.linkedin}`}
                >
                  <Icon icon="mdi:linkedin" className={`${styles.linkedin}`} />
                </a>
              )}
              {member.github && (
                <a
                  href={`https://github.com/${member.github}`}
                  aria-label="github"
                  className={`${styles["social-icons"]} ${styles.github}`}
                >
                  <Icon icon="mdi:github" className={` ${styles.github}`} />
                </a>
              )}
              {member.facebook && (
                <a
                  href={`https://github.com/${member.facebook}`}
                  aria-label="fb"
                  className={`${styles["social-icons"]} ${styles.facebook}`}
                >
                  <Icon icon="ic:baseline-facebook" className={`${styles.facebook}`} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;
