import React from "react";
import { FaInstagram, FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer-centre"]}>
        <h3>Questions?</h3>
        <p>Contact us through our social media accounts</p>
        <Link
          href="https://www.facebok.com/gdscnits/"
          className={styles["social-media-icons"]}
          target="_blank"
        >
          <FaFacebook className={styles["social-media-icons"]} />
        </Link>
        <Link
          href="https://github.com/gdsc-nits-org"
          className={styles["social-media-icons"]}
          target="_blank"
        >
          <FaGithub className={styles["social-media-icons"]} />
        </Link>
        <Link
          href="https://www.linkedin.com/company/gdscnits/mycompany/"
          className={styles["social-media-icons"]}
          target="_blank"
        >
          <FaLinkedin className={styles["social-media-icons"]} />
        </Link>
        <Link
          href="https://www.instagram.com/gdsc_nits/"
          className={styles["social-media-icons"]}
          target="_blank"
        >
          <FaInstagram className={styles["social-media-icons"]} />
        </Link>
        <br />
        <span>or email us at </span>
        <Link href="mailto:gdsc@nits.ac.in">gdsc@nits.ac.in</Link>
      </div>
      <div className={styles["footer-content"]}>
        <div className={styles["footer-left"]}>
          <h3>About</h3>
          <div className={styles["divider-left"]}></div>
          <div className={styles["fleft-content"]}>
            <ul className={styles["f-listitem"]}>
              <li>
                {" "}
                <Link href="/">Vision</Link>
              </li>
              <li>
                {" "}
                <Link href="/">Mission</Link>
              </li>
              <li>
                <Link href="/"> Types of Events</Link>
              </li>
              <li>
                <Link href="/"> Google Technologies</Link>
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
              <Link href="/">Executive Board</Link>
            </li>
            <li>
              {" "}
              <Link href="/">Departments</Link>
            </li>
            <li>
              {" "}
              <Link href="/">Join Us</Link>
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
