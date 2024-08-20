import style from "./Departments.module.scss";

const iconMappping = {
  "COMPUTER SCIENCE & ENGINEERING": "/assets/departments/CSEdept.png",
  "ELECTRONICS & COMMUNICATION ENGINEERING": "/assets/departments/ECEdept.png",
  "ELECTRICAL ENGINEERING": "/assets/departments/EEdept.png",
  "MECHANICAL ENGINEERING": "/assets/departments/MechDept.png",
  "CIVIL ENGINEERING": "/assets/departments/CivilDept.png",
  "ELECTRONICS & INSTRUMENTATION ENGINEERING": "/assets/departments/EIEdept.png",
};

const DepartmentCard = ({ data }) => {
  const departmentName = data?.name;

  const assignedImage =
    iconMappping[departmentName] ||
    iconMappping[
      Object.keys(iconMappping)[
        Math.floor(Math.random() * Object.keys(iconMappping).length)
      ]
    ];

  return (
    <div className={style["dcard-container"]}>
      <div className={style["dcard-link"]}>
        <div className={style.dcard}>
          <p className={style.dname}>{data?.name}</p>
          <img src={assignedImage} alt={data?.name} className={style["dcard-img"]} />
        </div>
      </div>
    </div>
  );
};

export default DepartmentCard;
