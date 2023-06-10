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
    <nav className={`${styles.navbar} ${toggle ? styles.large : ""}`}>
      <div className={styles.leftSection}>
        <button className={styles.switchIcon} onClick={handleSwitch}>
          {toggle ? (
            <Icon
              icon="mdi:arrow-left"
              width="37"
              height="37"
              color="rgb(116, 114, 114)"
            />
          ) : (
            <Icon
              icon="charm:menu-hamburger"
              width="35"
              height="35"
              color="rgb(116, 114, 114)"
            />
          )}
        </button>
        <Link className={styles.logopart} to="/">
          <img className={styles.logo1} src="/images/gdsc logo.png" alt="logo" />
          <img className={styles.logo2} src="/images/grafinyicon.png" alt="logo" />
        </Link>
      </div>
      <Link className={styles.navProfile2} to="/">
        <Icon
          icon="healthicons:ui-user-profile-outline"
          width="37"
          height="37"
          color="rgb(116, 114, 114)"
        />
      </Link>
      <div className={styles.right}>
        <div className={`${styles.links} ${toggle ? "showDropdown" : ""}`}>
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
            to="/bookmark"
          >
            Bookmark
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.navlinks} ${styles.active}` : styles.navlinks
            }
            to="/profile"
          >
            Profile
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.navlinks} ${styles.active}` : styles.navlinks
            }
            to="/team"
          >
            Team
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
