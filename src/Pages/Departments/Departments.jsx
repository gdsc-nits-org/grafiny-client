import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";
import { toast } from "react-toastify";
import { DepartmentCard, CreateDepartment } from "../../Components";
import style from "./Departments.module.scss";

const Departments = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { state } = useLocation();

  const navigate = useNavigate();

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleSem = async (data) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/semester/getAll?id=${data.id}`
      );
      navigate(`/semesters`, {
        state: {
          semesters: response.data.msg.semesters,
        },
      });
      return null;
    } catch (error) {
      // console.error(error);
      return toast.error("Something Went Wrong", { autoClose: 1200 });
    }
  };
  return (
    <div className={style.departments}>
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
      {showPopup && <CreateDepartment onClose={togglePopup} />}
      <div className={style["dcard-container"]}>
        {state.departments?.map((dept) => (
          <div onClick={() => handleSem(dept)} onKeyDown={() => handleSem(dept)}>
            <DepartmentCard data={dept} key={dept.dept} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Departments;
