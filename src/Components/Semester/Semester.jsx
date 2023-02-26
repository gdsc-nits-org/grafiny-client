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
        <button>First</button>
        <button>Second</button>
        <button>Third</button>
        <button>Fourth</button>

        <button>Fifth</button>
        <button>Sixth</button>
        <button>Seventh</button>
        <button>Eight</button>
      </div>
    </div>
  );
};

export default Semester;
