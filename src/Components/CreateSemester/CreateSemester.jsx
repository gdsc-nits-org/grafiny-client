import axios from "axios";
import { toast } from "react-toastify";
import { useState, useContext } from "react";
import UserContext from "../../Global/Auth/authContext";
import styles from "../CreateDepartment/CreateDepartment.module.scss";

const CreateSemester = ({
  departmentId,
  setLoading,
  setSemester,
  semesters,
  departmentName,
}) => {
  const [semNumber, setSemNumber] = useState("");
  const { auth } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(() => true);
      const token = await auth.currentUser.getIdToken(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/semester/create`,
        {
          departmentId,
          semNumber,
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
        return toast.error(data.msg, { autoClose: 1200 });
      }
      setSemester([...semesters, data.msg.semesters]);
      setLoading(() => false);
      toast.success("Semester Created Successfulyy", { autoClose: 1200 });
      return window.location.reload();
    } catch (err) {
      setLoading(() => false);
      return toast.error("Something Went Wrong", { autoClose: 1200 });
    }
  };

  const handleSemesterChange = (event) => {
    setSemNumber(event.target.value);
  };

  return (
    <div className={styles["main-container"]}>
      <div className={styles.container}>
        <h2>Create Semester</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="instituteName">
              Department:
              <span> {departmentName}</span>
            </label>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Semester:</label>
            <select value={semNumber} onChange={handleSemesterChange}>
              <option>FIRST</option>
              <option>SECOND</option>
              <option>THIRD</option>
              <option>FOURTH</option>
              <option>FIFTH</option>
              <option>SIXTH</option>
              <option>SEVENT</option>
              <option>EIGHTH</option>
              setSemNumber()
            </select>
          </div>
          <button type="submit" className={styles.submitBtn} onClick={handleSubmit}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSemester;
