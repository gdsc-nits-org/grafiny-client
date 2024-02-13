import { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../../Global/Auth/authContext";
import styles from "../CreateDepartment/CreateDepartment.module.scss";

const CreateCourse = ({ semId, semNumber }) => {
  const { auth } = useContext(UserContext);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

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
      console.log(response.data);
      setName("");
      setCode("");
      setError("");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className={styles["main-container"]}>
      <div className={styles.container}>
        <h2>Create Course</h2>
        {error && <p className={styles.error}>{error}</p>}
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
