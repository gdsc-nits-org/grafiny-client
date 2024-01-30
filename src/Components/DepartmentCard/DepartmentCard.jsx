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
  );
};

export default DepartmentCard;
