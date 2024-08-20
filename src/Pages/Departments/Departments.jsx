import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Icon } from "@iconify/react";
import axios from "axios";
import { toast } from "react-toastify";
import { DepartmentCard, CreateDepartment, Loading } from "../../Components";
import style from "./Departments.module.scss";
import UserContext from "../../Global/Auth/authContext";

const Departments = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { state } = useLocation();

  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { loading, setLoading, user, auth, departments, setDepartments } = context;

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleSem = async (item) => {
    try {
      setLoading(() => true);
      const token = await auth?.currentUser?.getIdToken(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/semester/getAll?id=${item.id}`,
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
      setLoading(() => false);
      window.localStorage.setItem("semesters", JSON.stringify(data.msg.semesters));
      navigate(`/semesters`, {
        state: {
          departmentId: item.id,
          departmentName: item.name,
          semesters: data.msg.semesters,
        },
      });
      return null;
    } catch (err) {
      setLoading(false);
      return toast.error(err, { autoClose: 1200 });
    }
  };

  useEffect(() => {
    if (!user || !state) {
      navigate("/");
      toast.error("Please log in to continue", { autoClose: 1200 });
    } else {
      setDepartments(() => JSON.parse(localStorage.getItem("departments")));
    }
  }, [user, state, navigate, setDepartments]);

  return (
    <div className={style.departments}>
      {loading === false ? (
        <div>
          <div className={style.dcontainer}>
            <h2 className={style.dhead}>Departments</h2>
            {(user.authorisationLevel === "ADMIN" ||
              user.authorisationLevel === "SUPERADMIN") && (
              <button
                className={style["add-dept"]}
                onClick={togglePopup}
                aria-label="Add Department"
              >
                {showPopup ? <Icon icon="mdi:close" /> : <Icon icon="mdi:plus" />}
              </button>
            )}
          </div>
          {showPopup && (
            <CreateDepartment
              onClose={togglePopup}
              instituteName={state.instituteName}
              departments={departments}
              setDepartments={setDepartments}
              setLoading={setLoading}
            />
          )}
          <div className={style["dcard-container"]}>
            {departments?.map((dept) => (
              <div
                onClick={() => handleSem(dept)}
                onKeyDown={() => handleSem(dept)}
                key={dept.id}
                role="button"
                tabIndex={0}
                aria-label="Department"
              >
                <DepartmentCard data={dept} />
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

export default Departments;
