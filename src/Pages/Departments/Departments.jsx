import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { DepartmentCard, CreateDepartment } from "../../Components";
import style from "./Departments.module.scss";

const Departments = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { state } = useLocation();
  console.log(state);

  const togglePopup = () => {
    setShowPopup(!showPopup);
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
      <DepartmentCard />
    </div>
  );
};

export default Departments;
