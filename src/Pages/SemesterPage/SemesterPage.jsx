import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { BsArrowLeft } from "react-icons/bs";
import { Semester, Loading } from "../../Components";
import style from "./SemesterPage.module.scss";
import UserContext from "../../Global/Auth/authContext";

const SemesterPage = () => {
  const { state } = useLocation();
  const context = useContext(UserContext);
  const [semesters, setSemesters] = useState([]);
  const { loading, setLoading, user } = context;
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate(-1);
  };

  const handleSem = async () => {
    try {
      setLoading(() => true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/semester/getAll?id=${state.departmentId}`
      );
      const { data } = response;
      // console.log(data);
      if (data.status !== 200) {
        setLoading(() => false);
        return toast.error(data.msg, { autoClose: 1200 });
      }
      setSemesters(() => data.msg.semesters);
      setLoading(() => false);
      return null;
    } catch (error) {
      // console.error(error);
      setLoading(() => false);
      return toast.error("Something Went Wrong", { autoClose: 1200 });
    }
  };

  useEffect(() => {
    if (!user) {
      toast.error("Please Log In", { autoClose: 1200 });
    } else if (!state) {
      navigate("/");
    } else {
      handleSem();
    }
  }, []);

  return (
    <main className={style.semesterPage}>
      <h1>Semesters</h1>
      {loading === false ? (
        <div>
          <div className={style.arrow}>
            <BsArrowLeft onClick={navigateTo} className={style.arrowicon} />
          </div>
          <div className={style.semBox}>
            {semesters?.map((sem) => (
              <Semester key={sem.id} semNumber={sem.semNumber} />
            ))}
            {semesters?.map((sem) => (
              <Semester key={sem.id} semNumber={sem.semNumber} />
            ))}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </main>
  );
};

export default SemesterPage;
