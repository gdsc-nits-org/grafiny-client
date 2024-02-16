import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UserContext from "../../Global/Auth/authContext";
import styles from "../CreateDepartment/CreateDepartment.module.scss";

const CreateCourse = ({ semId, semNumber, coursesData, setCoursesData, setLoading }) => {
  const { auth } = useContext(UserContext);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = await auth.currentUser.getIdToken(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/course/create`,
        {
          name,
          code,
          id: semId,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      if (data.status !== 200) {
        setLoading(() => false);
        toast.error(data.msg, { autoClose: 1200 });
      } else {
        setCoursesData(() => [...coursesData, data.msg.course]);
        setLoading(() => false);
        toast.success("Semester Created Successfulyy", { autoClose: 1200 });
      }
    } catch (err) {
      setLoading(() => false);
      toast.error("Something Went Wrong", { autoClose: 1200 });
    }
  };

  return (
    <div className={styles["main-container"]}>
      <div className={styles.container}>
        <h2>Create Course</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">
              Semester:
              <span> {semNumber}</span>
            </label>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Course Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="code">Course Code:</label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.submitBtn}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
