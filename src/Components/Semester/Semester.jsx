import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import semstyle from "./Semester.module.scss";

const Semester = () => {
  const navigate = useNavigate();
  const navigateTo = () => {
    const path = "../home";
    navigate(path);
  };

  return (
    <div className={semstyle.container}>
      <div className={semstyle.arrow}>
        <BsArrowLeft onClick={navigateTo} className={semstyle.arrowicon} />
      </div>
      <div className={semstyle.title}>Semester</div>
      <div className={semstyle.sembox}>
        <div className={semstyle.boxleft}>
          <button className={semstyle.boxes}>First</button>
          <button className={semstyle.boxes}>Third</button>
          <button className={semstyle.boxes}>Fifth</button>
          <button className={semstyle.boxes}>Seventh</button>
        </div>
        <div className={semstyle.boxright}>
          <button className={semstyle.boxes}>Second</button>
          <button className={semstyle.boxes}>Fourth</button>
          <button className={semstyle.boxes}>Sixth</button>
          <button className={semstyle.boxes}>Eight</button>
        </div>
      </div>
    </div>
  );
};

export default Semester;
