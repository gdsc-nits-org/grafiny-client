import { FaInstagram, FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer-centre"]}>
        <h3>Questions?</h3>
        <p>Contact us through our social media accounts</p>
        <a
          href="https://www.facebook.com/gdscnits/"
          aria-label="fb"
          className={styles["social-media-icons"]}
        >
          <FaFacebook className={styles["social-media-icons"]} />
        </a>
        <a
          href="https://github.com/gdsc-nits-org"
          aria-label="github"
          className={styles["social-media-icons"]}
        >
          <FaGithub className={styles["social-media-icons"]} />
        </a>
        <a
          href="https://www.linkedin.com/company/gdscnits/mycompany/"
          aria-label="linkedin"
          className={styles["social-media-icons"]}
        >
          <FaLinkedin className={styles["social-media-icons"]} />
        </a>
        <a
          href="https://www.instagram.com/gdsc_nits/"
          aria-label="insta"
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
                <a
                  href="https://blog.gdscnits.in"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="https://gdscnits.in/projects"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="https://gdscnits.in/events"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Events
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles["footer-right"]}>
          <h3>Team</h3>
          <div className={styles["divider-right"]}></div>
          <ul className={styles["f-listitem"]}>
            <li>
              <Link to="/aboutus">Contact Us</Link>
            </li>
            <li>
              <a href="https://gdscnits.in" target="_blank" rel="noopener noreferrer">
                Website
              </a>
            </li>
            <li>
              <a
                href="https://github.com/gdsc-nits-org/grafiny-client"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contribute
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles["footer-end"]}>
        <img src="/assets/gdscNits.png" alt="gdsc-nits" />
        <p>
          <small>
            © {new Date().getFullYear()} GDSC NIT Silchar. All rights reserved.
          </small>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
