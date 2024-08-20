import axios from "axios";
import { toast } from "react-toastify";
import { useState, useContext } from "react";
import UserContext from "../../Global/Auth/authContext";
import styles from "../CreateDepartment/CreateDepartment.module.scss";

const CreateSemester = ({
  onClose,
  departmentId,
  setLoading,
  setSemester,
  semesters,
  departmentName,
}) => {
  const [semNumber, setSemNumber] = useState("FIRST");
  const { auth } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!semNumber) {
      toast.error("Required fields cannot be empty", { autoClose: 1200 });
      return;
    }
    try {
      setLoading(true);
      const token = await auth?.currentUser?.getIdToken(true);
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
      setLoading(false);
      if (data.status !== 200) {
        toast.error(data.msg, { autoClose: 1200 });
      } else {
        const updatedSemesters = [...semesters, data.msg.semester];
        window.localStorage.setItem("semesters", JSON.stringify(updatedSemesters));
        setSemester(() => updatedSemesters);
        toast.success("Semester created successfully", { autoClose: 1200 });
        onClose();
      }
    } catch (err) {
      setLoading(false);
      toast.error(err, { autoClose: 1200 });
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
              <select id="instituteName" disabled>
                <option defaultValue={departmentName}>{departmentName}</option>
              </select>
            </label>
            <label htmlFor="name">Semester:</label>
            <select value={semNumber} onChange={handleSemesterChange}>
              <option>FIRST</option>
              <option>SECOND</option>
              <option>THIRD</option>
              <option>FOURTH</option>
              <option>FIFTH</option>
              <option>SIXTH</option>
              <option>SEVENTH</option>
              <option>EIGHTH</option>
            </select>
          </div>
          <button type="submit" className={styles.submitBtn}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSemester;
