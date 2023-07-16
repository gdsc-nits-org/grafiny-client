import { useState } from "react";
import { Icon } from "@iconify/react";
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
  const handleFileChange = () => {
    //
  };
  return (
    <div className={styles["create-profile"]}>
      <div className={styles["profile-form"]}>
        <div className={styles["profile-title"]}>
          <h3>Create Profile</h3>
          <div className={styles["profile-icon"]}>
            <Icon className={styles["profile-icon"]} icon="iconamoon:profile-fill" />
          </div>
        </div>

        <div className={styles["profile-info"]}>
          <div className={styles["select-details"]}>
            <h4>
              Select Year <span className={styles["compulsory-field"]}>*</span>
            </h4>
            <select value={selectedYear} onChange={handleYearChange} required>
              <option value="">Select Year</option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
            </select>
          </div>

          <div className={styles["select-details"]}>
            <h4>
              Select Institution <span className={styles["compulsory-field"]}>*</span>
            </h4>
            <select value={selectedInst} onChange={handleInstChange} required>
              <option value="">Select Institution</option>
              <option value="1st">National Institute of Technology, Silchar</option>
            </select>
          </div>

          <div className={styles["select-details"]}>
            <h4>
              Student ID <span className={styles["compulsory-field"]}>*</span>
            </h4>
            <input type="text" name="scholarId" pattern="\d{7}" required />
          </div>

          <div className={styles["select-details"]}>
            <h4 className={styles.pfp}>Add Profile Photo</h4>
            <label htmlFor="profile-photo-input" className={styles["file-input-label"]}>
              Choose File
            </label>
            <input
              type="file"
              id="profile-photo-input"
              name="profilePhoto"
              accept="image/*"
              onChange={handleFileChange}
              className={styles["file-input"]}
              disabled // kept disabled for now
            />
          </div>
        </div>
        <button className={styles["continue-button"]}>Continue</button>
      </div>
    </div>
  );
};

export default CreateProfile;
