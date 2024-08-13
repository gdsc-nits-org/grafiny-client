import style from "./Departments.module.scss";

const iconMappping = {
  CSE: "/assets/departments/CSEdept.png",
  ECE: "/assets/departments/ECEdept.png",
  EE: "/assets/departments/EEdept.png",
  MECH: "/assets/departments/MechDept.png",
  CIVIL: "/assets/departments/CivilDept.png",
  EIE: "/assets/departments/EIEdept.png",
};

const DepartmentCard = ({ data }) => {
  return (
    <div className={style["dcard-container"]}>
      <div className={style["dcard-link"]}>
        <div className={style.dcard}>
          <p className={style.dname}>{data?.name}</p>
          <img
            src={iconMappping[data?.name]}
            alt={data?.name}
            className={style["dcard-img"]}
          />
        </div>
      </div>
    </div>
  );
};

export default DepartmentCard;
