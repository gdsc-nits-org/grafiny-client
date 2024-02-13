import { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import styles from "./Navbar.module.scss";
import UserContext from "../../Global/Auth/authContext";
import Loading from "../Loading/Loading";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const context = useContext(UserContext);
  const { user, handleGoogleLogin, logout, loading } = context;

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
    <div>
      {loading === false ? (
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
                to="/aboutus"
              >
                About
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
              {user !== "" ? (
                <button className={styles.logout} onClick={() => logout()}>
                  Logout{" "}
                  <span>
                    <Icon
                      icon="majesticons:logout"
                      width="45"
                      height="30"
                      color="rgb(255, 255, 255)"
                    />
                  </span>
                </button>
              ) : (
                <button className={styles.login} onClick={() => handleGoogleLogin()}>
                  <div className={styles.img}>
                    <img src="/assets/Google.png" alt="logo" className={styles.img} />
                  </div>
                  <div className={styles.logintext}>Login</div>
                </button>
              )}
            </div>
          </div>
        </nav>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Navbar;
