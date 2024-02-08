import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import semstyle from "./Semester.module.scss";

const Semester = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const navigateTo = () => {
    navigate(-1);
  };
  const { semesters } = state;

  const handleCourses = async (data) => {
    console.log(data);
    navigate(`${data.semNumber}/courses`, {
      state: {
        courses: data.courses,
      },
    });
    return null;
  };

  return (
    <div className={semstyle.container}>
      <div className={semstyle.arrow}>
        <BsArrowLeft onClick={navigateTo} className={semstyle.arrowicon} />
      </div>
      <div className={semstyle.title}>Semester</div>
      {semesters.map((semester) => (
        <div
          className={semstyle.sembox}
          key={semester.id}
          role="button"
          onClick={() => {
            handleCourses(semester);
          }}
          onKeyDown={() => {
            handleCourses(semester);
          }}
          tabIndex={0}
          aria-label="Semester"
        >
          <button>{semester.semNumber}</button>
        </div>
      ))}
    </div>
  );
};

export default Semester;
