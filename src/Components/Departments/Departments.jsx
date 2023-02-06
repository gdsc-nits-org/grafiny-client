import { Icon } from "@iconify/react";
import style from "./Departments.module.scss";
import ce from "../../Assets/Images/CivilDept.png";
import cse from "../../Assets/Images/CSEdept.png";
import me from "../../Assets/Images/MechDept.png";
import eie from "../../Assets/Images/EIEdept.png";
import ece from "../../Assets/Images/ECEdept.png";
import ee from "../../Assets/Images/EEdept.png";
const deptData = [
  {
    dept: "Civil Department",
    dlogo: ce,
  },
  {
    dept: "Mechanical Department",
    dlogo: me,
  },
  {
    dept: "EIE Department",
    dlogo: eie,
  },
  {
    dept: "EE Department",
    dlogo: ee,
  },
  {
    dept: "ECE Department",
    dlogo: ece,
  },
  {
    dept: "CSE Department",
    dlogo: cse,
  },
];

const Departments = () => {
  return (
    <>
      <div className={style.dcontainer}>
        <div className={style.dleftarrow}>
          <Icon icon="mdi:arrow-left" color="rgb(116, 114, 114)" />
        </div>
        <h2 className={style.dhead}>Departments</h2>
      </div>
      <div className={style["dcard-container"]}>
        {deptData.map((data) => {
          return (
            <div className={style.dcard}>
              <p className={style.dname}>{data?.dept}</p>
              <img src={data?.dlogo} alt="department" className={style["dcard-img"]} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Departments;
