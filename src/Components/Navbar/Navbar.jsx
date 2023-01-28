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
      <button className={styles.switchIcon} onClick={handleSwitch}>
        {toggle ? (
          <Icon icon="mdi:arrow-left" width="37" height="37" color="rgb(116, 114, 114)" />
        ) : (
          <Icon
            icon="charm:menu-hamburger"
            width="35"
            height="35"
            color="rgb(116, 114, 114)"
          ></Icon>
        )}
      </button>
      <Link className={styles.logopart} to="/">
        <img src="/images/gdsclogo.png" alt="logo" />
        <img className={styles.logo2} src="/images/grafinyicon.png" alt="logo" />
      </Link>
      <div className={styles.menupart}>
        <div className={styles.navProfile}>
          <Icon
            icon="healthicons:ui-user-profile-outline"
            width="37"
            height="37"
            color="rgb(116, 114, 114)"
          />
        </div>

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
            to="/bookmarks"
          >
            Bookmarks
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
