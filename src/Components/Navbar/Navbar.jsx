import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  const handleSwitch = () => {
    setToggle((prevToggleValue) => !prevToggleValue);
  };

  const changeSwitch = () => {
    if (window.scrollY >= 90 && window.innerWidth > 1000) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  };
  window.addEventListener("scroll", changeSwitch);

  return (
    <nav className={toggle ? `${styles.navbar} ${styles.large}` : styles.navbar}>
      <Link className={styles.logopart} to="/">
        <img src="/images/gdsclogo.png" alt="logo" />
        <img className={styles.logo2} src="/images/grafinyicon.png" alt="logo" />
      </Link>
      <div className={styles.menupart}>
        <button className={styles.switchIcon} onClick={handleSwitch}>
          {toggle ? (
            <Icon icon="maki:arrow" width="37"></Icon>
          ) : (
            <Icon icon="charm:menu-hamburger" width="37" height="37"></Icon>
          )}
        </button>
        <div className={styles.links}>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.navlinks} ${styles.active}` : styles.navlinks
            }
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.navlinks} ${styles.active}` : styles.navlinks
            }
            to="/resources"
          >
            Resources
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.navlinks} ${styles.active}` : styles.navlinks
            }
            to="/profile"
          >
            Profile
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
