import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext} from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Icon } from "@iconify/react";
import { Semester, Loading, CreateSemester } from "../../Components";
import style from "./SemesterPage.module.scss";
import UserContext from "../../Global/Auth/authContext";

const SemesterPage = () => {
  const { state } = useLocation();
  const context = useContext(UserContext);
  const { loading, setLoading, user, auth, semesters, setSemesters } = context;
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleCourse = async (item) => {
    try {
      setLoading(() => true);
      const token = await auth?.currentUser?.getIdToken(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/course/getAll?id=${item.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      if (data.status !== 200) {
        setLoading(() => false);
        return toast.error(data.msg, { autoClose: 1200 });
      }
      setLoading(() => false);
      navigate(`/courses`, {
        state: {
          semId: item.id,
          semNumber: item.semNumber,
          departmentName: state?.departmentName,
          courses: data.msg.courses,
        },
      });
      return null;
    } catch (error) {
      setLoading(() => false);
      return toast.error("Something Went Wrong. Please Log In If You Haven't", {
        autoClose: 1200,
      });
    }
  };

  useEffect(() => {
    if (!user || !state) {
      navigate("/");
      toast.error("Please Log In", { autoClose: 1200 });
    } else {
      setSemesters(() => state?.semesters);
    }

  }, [navigate, state, user]);


  return (
    <main className={style.semesterPage}>
      {loading === false ? (
        <div>
          <div className={style.arrowContainer}>
            <h2 className={style.dhead}>Semesters</h2>
            {user.authorisationLevel === "ADMIN" && (
              <button
                className={style["add-sem"]}
                onClick={togglePopup}
                aria-label="Add Department"
              >
                {showPopup ? <Icon icon="mdi:close" /> : <Icon icon="mdi:plus" />}
              </button>
            )}
          </div>
          {showPopup && (
            <CreateSemester
              onClose={togglePopup}
              departmentId={state?.departmentId}
              departmentName={state?.departmentName}
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
