import { useState } from "react";
import axios from "axios";
import styles from "../CreateDepartment/CreateDepartment.module.scss";

const CreateCourse = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const semesterId = "65b60953f55c3c01dac7acb9";

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/course/create`,
        {
          name,
          code,
          id: semesterId,
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
