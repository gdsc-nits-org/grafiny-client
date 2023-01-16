import React from "react";
import { FaInstagram, FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer-centre"]}>
        <h3>Questions?</h3>
        <p>Contact us through our social media accounts</p>
        <a
          href="https://www.facebok.com/gdscnits/"
          className={styles["social-media-icons"]}
        >
          <FaFacebook className={styles["social-media-icons"]} />
        </a>
        <a
          href="https://github.com/gdsc-nits-org"
          className={styles["social-media-icons"]}
        >
          <FaGithub className={styles["social-media-icons"]} />
        </a>
        <a
          href="https://www.linkedin.com/company/gdscnits/mycompany/"
          className={styles["social-media-icons"]}
        >
          <FaLinkedin className={styles["social-media-icons"]} />
        </a>
        <a
          href="https://www.instagram.com/gdsc_nits/"
          className={styles["social-media-icons"]}
        >
          <FaInstagram className={styles["social-media-icons"]} />
        </a>
        <br />
        <span>or email us at </span>
        <a href="mailto:gdsc@nits.ac.in">gdsc@nits.ac.in</a>
      </div>
      <div className={styles["footer-content"]}>
        <div className={styles["footer-left"]}>
          <h3>About</h3>
          <div className={styles["divider-left"]}></div>
          <div className={styles["fleft-content"]}>
            <ul className={styles["f-listitem"]}>
              <li>
                {" "}
                <a href="/">Vision</a>
              </li>
              <li>
                {" "}
                <a href="/">Mission</a>
              </li>
              <li>
                <a href="/"> Types of Events</a>
              </li>
              <li>
                <a href="/"> Google Technologies</a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles["footer-right"]}>
          <h3>Team</h3>
          <div className={styles["divider-right"]}></div>
          <ul className={styles["f-listitem"]}>
            <li>
              {" "}
              <a href="/">Executive Board</a>
            </li>
            <li>
              {" "}
              <a href="/">Departments</a>
            </li>
            <li>
              {" "}
              <a href="/">Join Us</a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles["footer-end"]}>
        <img src="../assets/gdsc.png" alt="" />
        <h5>Google Developer Students Club</h5>
        <p>National Institute of Technology Silchar</p>
      </div>
    </footer>
  );
};

export default Footer;
