import { useState } from "react";
import styles from "./CreateProfile.module.scss";
const CreateProfile = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedInst, setSelectedInst] = useState(" ");
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };
  const handleInstChange = (e) => {
    setSelectedInst(e.target.value);
  };
  return (
    <div className={styles["create-profile"]}>
      <div className={styles["profile-form"]}>
        <h3>Create Profile</h3>
        <div className={styles["profile-info"]}>
          <div className={styles["select-details"]}>
            <h4>Select Year</h4>
            <select value={selectedYear} onChange={handleYearChange}>
              <option value="">Select Year</option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
            </select>
          </div>

          <div className={styles["select-details"]}>
            <h4>Select Institution</h4>
            <select value={selectedInst} onChange={handleInstChange}>
              <option value="">Select Institution</option>
              <option value="1st">National Institute of Technology, Silchar</option>
            </select>
          </div>

          <div className={styles["select-details"]}>
            <h4>Student ID</h4>
            <input type="text" name="scholarId" pattern="\d{7}" />
          </div>
        </div>
        <button className={styles["continue-button"]}>Continue</button>
      </div>
    </div>
  );
};

export default CreateProfile;
