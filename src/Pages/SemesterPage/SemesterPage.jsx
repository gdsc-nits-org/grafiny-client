import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Icon } from "@iconify/react";
import { BsArrowLeft } from "react-icons/bs";
import { Semester, Loading, CreateSemester } from "../../Components";
import style from "./SemesterPage.module.scss";
import UserContext from "../../Global/Auth/authContext";

const SemesterPage = () => {
  const { state } = useLocation();
  const context = useContext(UserContext);
  const [semesters, setSemesters] = useState([]);
  const { loading, setLoading, user } = context;
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const navigateTo = () => {
    navigate(-1);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

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

  const handleCourse = async (data) => {
    try {
      navigate(`/courses`, {
        state: {
          semId: data.id,
          semNumber: data.semNumber,
        },
      });
      return null;
    } catch (error) {
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
            <button
              className={style["add-sem"]}
              onClick={togglePopup}
              aria-label="Add Department"
            >
              {showPopup ? <Icon icon="mdi:close" /> : <Icon icon="mdi:plus" />}
            </button>
          </div>
          {showPopup && (
            <CreateSemester
              onClose={togglePopup}
              departmentId={state.departmentId}
              departmentName={state.departmentName}
              semesters={semesters}
              setSemester={setSemesters}
              setLoading={setLoading}
            />
          )}
          <div className={style.semBox}>
            {semesters?.map((sem) => (
              <div
                onClick={() => handleCourse(sem)}
                onKeyDown={() => handleCourse(sem)}
                key={sem?.id}
              >
                <Semester semNumber={sem?.semNumber} />
              </div>
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
