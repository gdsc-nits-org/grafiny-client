import style from "./Departments.module.scss";

const DepartmentCard = ({ data }) => {
  return (
    <div className={style["dcard-container"]}>
      <div className={style["dcard-link"]}>
        <div className={style.dcard}>
          <p className={style.dname}>{data?.name}</p>
          <img
            src="https://img.icons8.com/ios/452/department.png"
            alt="department"
            className={style["dcard-img"]}
          />
        </div>
      </div>
    </div>
  );
};

export default DepartmentCard;
