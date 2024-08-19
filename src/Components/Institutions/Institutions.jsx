import { useEffect, useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./Institutions.module.scss";
import UserContext from "../../Global/Auth/authContext";
import Loading from "../Loading/Loading";

const Institutions = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const { user, loading, setLoading, auth,institutes, setInstitutes } = useContext(UserContext);

  const fetchInstitutes = useCallback(
    async (searchTerm = "") => {
      setLoading(true);
      try {
        const token = await auth?.currentUser?.getIdToken(true);
        const url = searchTerm
          ? `${
              import.meta.env.VITE_BASE_URL
            }/institute/search?instituteName=${searchTerm}`
          : `${import.meta.env.VITE_BASE_URL}/institute/getAll`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { data } = response;
        setInstitutes(data?.msg?.institutes || []);
      } catch (err) {
        toast.error("Something Went Wrong", { autoClose: 1200 });
      } finally {
        setLoading(false);
      }
    },
    [auth, setLoading]
  );

  const handleDepartmentRoute = useCallback(
    async (item) => {
      if (!user || !user.name) {
        toast.error("Please Log In", { autoClose: 1200 });
        navigate("/");
        return;
      }

      setLoading(true);
      try {
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
          toast.error(data.msg, { autoClose: 1200 });
          return;
        }
        window.localStorage.setItem("departments", JSON.stringify(data.msg.departments));
        navigate(`/departments`,{
          state: {
            instituteId: item.id,
            instituteName: item.name,
            departments: data.msg.departments,
          },
        });
      } catch (err) {
        toast.error("Something Went Wrong. Please Log In If You Haven't", {
          autoClose: 1200,
        });
      } finally {
        setLoading(false);
      }
    },
    [auth, navigate, setLoading, user]
  );

  const handleSearch = () => {
    fetchInstitutes(value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    fetchInstitutes();
  }, [fetchInstitutes]);

  return (
    <div>
      {!loading ? (
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
                  onKeyPress={handleKeyPress}
                  className={styles.titleSearchBoxSearch}
                  aria-label="Search Institutions"
                />
                <button
                  type="button"
                  onClick={handleSearch}
                  className={styles.titleSearchBoxButton}
                  aria-label="search"
                >
                  <i className="fa fa-search" />
                </button>
              </form>
            </div>
          </div>
          <div className={styles.instiCardContainer}>
            {institutes?.map((data) => (
              <div key={data.id} className={styles.instiCardWrapper}>
                <div
                  className={styles.instiCard}
                  onClick={() => handleDepartmentRoute(data)}
                  onKeyPress={handleKeyPress}
                  role="button"
                  tabIndex={0}
                >
                  <img
                    src="/images/nitsLogo.png"
                    alt={`${data.name} logo`}
                    className={styles.instiCardImg}
                  />
                </div>
                <p className={styles.text}>{data.name}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Institutions;
