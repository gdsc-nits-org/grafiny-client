import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./CreateDepartment.module.scss";

const CreateDepartment = () => {
  const [name, setName] = useState("");
  const [instituteName, setInstituteName] = useState("");
  const [error, setError] = useState("");
  const [institutes, setInstitutes] = useState([]);

  const fetchInstitutes = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/institute/getAll`
      );
      const { data } = response;
      setInstitutes(() => data.msg.institutes);
    } catch (err) {
      console.error("Error fetching institutes:", err);
    }
  };

  useEffect(() => {
    fetchInstitutes();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/department/create`,
        {
          name,
          instituteName,
        }
      );
      console.log(response.data);
      setName("");
      setInstituteName("");
      setError("");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className={styles["main-container"]}>
      <div className={styles.container}>
        <h2>Create Department</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Department Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="instituteName">Institute Name:</label>
            <select
              id="instituteName"
              value={instituteName}
              onChange={(e) => setInstituteName(e.target.value)}
              required
            >
              <option value="">Select Institute</option>
              {institutes.map((institute) => (
                <option key={institute.id} value={institute.name}>
                  {institute.name}
                </option>
              ))}
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

export default CreateDepartment;
