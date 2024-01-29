import { useLocation } from "react-router-dom";
import { DepartmentCard } from "../../Components";
import style from "./Departments.module.scss";
const Departments = () => {
  const { state } = useLocation();
  console.log(state);
  return (
    <div className={style.departments}>
      <DepartmentCard />
    </div>
  );
};

export default Departments;
