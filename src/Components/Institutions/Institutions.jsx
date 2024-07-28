import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./Institutions.module.scss";
import UserContext from "../../Global/Auth/authContext";
import Loading from "../Loading/Loading";

const Institutions = () => {
  const [institutes, setInstitutes] = useState([]);
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { user, loading, setLoading,auth } = context;

  const searchInstitute = async () => {
    try {
      setLoading(() => true);
      const token = await auth?.currentUser?.getIdToken(true);
      if (value === "") {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/institute/getAll`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { data } = response;
        setInstitutes(() => data?.msg?.institutes);
      } else {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/institute/search?instituteName=${value}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { data } = response;
        setInstitutes(() => data?.msg?.institutes);
      }
      setLoading(() => false);
      return null;
    } catch (err) {
      setLoading(() => false)
      return toast.error("Something Went Wrong", { autoClose: 1200 });
    }
  };

  const handleDepartmentRoute = async(item) => {
    try{
    if (!user) {
      navigate("/");
      toast.error("Please Log In", { autoClose: 1200 });
    } else if (!user.name) {
      navigate("/");
      toast.error("Please Log In", { autoClose: 1200 });
    } else {
      setLoading(() => true); 
      const token = await auth?.currentUser?.getIdToken(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/department/getAll?id=${item.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      if (data.status !== 200) {
        setLoading(() => false);
        return toast.error(data.msg, { autoClose: 1200 });
      }
      setLoading(() => false)
      navigate(`/departments`, {
        state: {
          instituteId: item.id,
          instituteName: item.name,
          departments: data.msg.departments
        },
      });
    }
  }
  catch(err){
    setLoading(() => false);
    return toast.error("Something Went Wrong. Please Log In If You Have'nt", { autoClose: 1200 });
  }

  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchInstitute();
    }
  };
  useEffect(() => {
    searchInstitute();
  }, []);

  return (
    <div>
      {loading === false ? (
        <div className={styles.instiMain}>
          <div className={styles.instiTitleContainer}>
            <div className={styles.instiTitle}>Institutions</div>
            <div className={styles.titleSearchBox}>
              <form>
                <input
                  type="text"
                  placeholder="Search Institutions"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className={styles.titleSearchBoxSearch}
                />
                <button
                  type="button"
                  onClick={searchInstitute}
                  className={styles.titleSearchBoxButton}
                  aria-label="search"
                >
                  <i className="fa fa-search" />
                </button>
              </form>
            </div>
          </div>
          <div className={styles.instiCardContainer}>
            {institutes?.map((data) => {
              return (
                <div key={data.id}>
                  <div
                    className={styles.instiCard}
                    onClick={() => handleDepartmentRoute(data)}
                    onKeyDown={handleKeyPress}
                  >
                    <img
                      src="../src/Assets/Images/nitsLogo.png"
                      alt="institute logo"
                      className={styles.instiCardImg}
                    />
                  </div>
                  <div className={styles.text}>{data.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Institutions;
