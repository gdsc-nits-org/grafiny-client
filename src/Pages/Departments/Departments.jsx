import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";
import { toast } from "react-toastify";
import { DepartmentCard, CreateDepartment, Loading } from "../../Components";
import style from "./Departments.module.scss";

import UserContext from "../../Global/Auth/authContext";

const Departments = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { state } = useLocation();
  const [departments, setDepartments] = useState([]);

  const navigate = useNavigate();

  const context = useContext(UserContext);
  const { loading, setLoading, user } = context;

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const getDepartments = async () => {
    try {
      setLoading(() => true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/department/getAll?id=${state.instituteId}`
      );
      const { data } = response;
      if (data.status !== 200) {
        setLoading(() => false);
        return toast.error(data.msg, { autoClose: 1200 });
      }
      setDepartments(() => data.msg.departments);
      setLoading(() => false);
      return null;
    } catch (error) {
      setLoading(() => false);
      return toast.error("Something Went Wrong", { autoClose: 1200 });
    }
  };

  const handleSem = async (data) => {
    try {
      navigate(`/semesters`, {
        state: {
          departmentId: data.id,
          departmentName: data.name,
        },
      });
      return null;
    } catch (error) {
      // console.error(error);
      return toast.error("Something Went Wrong", { autoClose: 1200 });
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
      toast.error("Please Log In", { autoClose: 1200 });
    } else if (!state) {
      navigate("/");
    } else {
      getDepartments();
    }
  }, []);
  return (
    <div className={style.departments}>
      {loading === false ? (
        <div>
          <div className={style.dcontainer}>
            <Link to="/" className={style.dleftarrow}>
              <Icon icon="mdi:arrow-left" color="rgb(116, 114, 114)" />
            </Link>
            <h2 className={style.dhead}>Departments</h2>
            <button
              className={style["add-dept"]}
              onClick={togglePopup}
              aria-label="Add Department"
            >
              {showPopup ? <Icon icon="mdi:close" /> : <Icon icon="mdi:plus" />}
            </button>
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
