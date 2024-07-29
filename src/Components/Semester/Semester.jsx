import semstyle from "./Semester.module.scss";

const Semester = ({ semNumber }) => {
  return (
    <div className={semstyle.container}>
      <button>{semNumber}</button>
    </div>
  );
};

export default Semester;
