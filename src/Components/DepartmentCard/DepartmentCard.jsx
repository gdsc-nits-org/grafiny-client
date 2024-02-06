import CSE from "../../../public/assets/departments/CSEdept.png";
import style from "./Departments.module.scss";

const DepartmentCard = ({ data }) => {
  return (
    <div className={style["dcard-container"]}>
      <div className={style["dcard-link"]}>
        <div className={style.dcard}>
          <p className={style.dname}>{data?.name}</p>
          <img src={CSE} alt="department" className={style["dcard-img"]} />
        </div>
      </div>
    </div>
  );
};

export default DepartmentCard;
