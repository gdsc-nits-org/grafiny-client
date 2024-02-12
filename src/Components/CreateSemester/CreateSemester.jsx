import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import styles from "../CreateDepartment/CreateDepartment.module.scss";

const CreateSemester = ({
  departmentId,
  semNumber,
  setLoading,
  setSemester,
  semesters,
}) => {
  const [departmentName, setDepartmentName] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!semNumber) {
        return toast.error("Please Fill Out The Required Fields", { autoClose: 1200 });
      }
      setLoading(() => true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/semester/create`,
        {
          departmentId,
          semNumber,
        }
      );
      const { data } = response;
      if (data.status !== 200) {
        setLoading(() => false);
        return toast.error(data.msg, { autoClose: 1200 });
      }

      setSemester([...semesters, data.msg.semesters]);
      setLoading(() => false);
      return toast.error("Department Created Successfulyy", { autoClose: 1200 });
    } catch (err) {
      setLoading(() => false);
      return toast.error("Something Went Wrong", { autoClose: 1200 });
    }
  };

  const fetchDepartmentName = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/department/${departmentId}`
      );
      const { data } = response;
      if (data.status === 200) {
        setDepartmentName(data.msg.departmentName);
      }
    } catch (error) {
      console.error("Error fetching department name:", error);
    }
  };

  useEffect(() => {
    fetchDepartmentName();
  }, [departmentId]);

  return (
    <div className={styles["main-container"]}>
      <div className={styles.container}>
        <h2>Create Semester</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="instituteName">Department:</label>
            <p>{departmentName}</p>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Semester:</label>
            <select>
              <option>FIRST</option>
              <option>SECOND</option>
              <option>THIRD</option>
              <option>FORTH</option>
              <option>FIFTH</option>
              <option>SIXTH</option>
              <option>SEVENT</option>
              <option>EIGHTH</option>
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
