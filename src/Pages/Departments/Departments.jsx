import { DepartmentCard } from "../../Components";
import style from "./Departments.module.scss";
const Departments = () => {
  return (
    <div className={style.departments}>
      <DepartmentCard />
    </div>
  );
};

export default Departments;
