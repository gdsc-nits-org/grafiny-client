import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./Departments.module.scss";
const DepartmentCard = () => {
  const [deptData, setDeptData] = useState([]);
  useEffect(() => {
    fetch("/db/department.json")
      .then((res) => res.json())
      .then((data) => {
        setDeptData(data);
      });
  }, []);
  return (
    <>
      <div className={style.dcontainer}>
        <div className={style.dleftarrow}>
          <Link to="/">
            <Icon icon="mdi:arrow-left" color="rgb(116, 114, 114)" />
          </Link>
        </div>
        <h2 className={style.dhead}>Departments</h2>
      </div>
      <div className={style["dcard-container"]}>
        {deptData.map((data) => {
          return (
            <Link to={`/departments/${data.dept}/courses`}>
              <div className={style.dcard}>
                <p className={style.dname}>{data?.dept}</p>
                <img src={data?.dlogo} alt="department" className={style["dcard-img"]} />
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default DepartmentCard;
