import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Semester, Loading } from "../../Components";
import style from "./SemesterPage.module.scss";
import UserContext from "../../Global/Auth/authContext";
const SemesterPage = () => {
  const { state } = useLocation();
  const [semesters, setSemesters] = useState([]);
  const context = useContext(UserContext);
  const { loading, setLoading, user } = context;
  const navigate = useNavigate();
  const handleSem = async () => {
    try {
      setLoading(() => true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/semester/getAll?id=${state.departmentId}`
      );
      const { data } = response;
      console.log(data);
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
      return toast.error("Please Log In", { autoClose: 1200 });
    }
    if (!state) {
      return navigate("/");
    }
    handleSem();
    return null;
  }, []);
  return (
    <main className={style.SemesterPage}>
      {loading === false ? (
        <div>
          {semesters?.map((sem) => (
            <Semester key={sem.id} />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </main>
  );
};

export default SemesterPage;
