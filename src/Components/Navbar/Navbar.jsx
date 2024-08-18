import { useState, useContext } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Icon } from "@iconify/react";
import styles from "./Navbar.module.scss";
import UserContext from "../../Global/Auth/authContext";
import Loading from "../Loading/Loading";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, handleGoogleLogin, logout, loading,auth, setLoading, setUser } = context;
  
  const getProfile = async(user) => {
    try{
      if (!user) {
        toast.error("Please Log In", { autoClose: 1200 });
      } else if (user?.name === "") {
        toast.error("Please Log In", { autoClose: 1200 });
      } else if (!user?.profile) {
        navigate("/profilecreate");
        toast.error("Please Create A Profile", { autoClose: 1200 });
      }
      else{
      setLoading(true)
      const token = await auth.currentUser.getIdToken(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/profile/get?email=${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data: data2} = response;
      if (data2.status !== 200) {
        toast.error(data2.msg, { autoClose: 1200 });
        setLoading(false);
        return;
      }

      const { profile } = data2.msg;
      user.profile = profile;
      window.localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setLoading(false);
      navigate("/profile")
    }
    }
    catch(err){
      setLoading(false)
      console.log(err)
      toast.error(`Something Went Wrong. Please Log In If You Haven't`, { autoClose: 1200 });
    }
  }
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
                onClick={(e) => {
                  if (location.pathname === '/profile') {
                    e.preventDefault();
                    return;
                  }
                  e.preventDefault()
                  getProfile(user)
                }}
              >
                Profile
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
