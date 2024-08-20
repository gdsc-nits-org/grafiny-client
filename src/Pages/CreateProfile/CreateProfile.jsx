import { useState, useContext, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./CreateProfile.module.scss";
import UserContext from "../../Global/Auth/authContext";
import { Loading } from "../../Components";

const CreateProfile = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedInst, setSelectedInst] = useState("");
  const [scholarId, setScholarId] = useState("");
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(UserContext);
  const { auth } = context;

  const navigate = useNavigate();

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };
  const handleInstChange = (e) => {
    setSelectedInst(e.target.value);
  };

  const handleInstitute = async () => {
    setLoading(() => true);
    const data = await context.getAllInstitutes();
    setInstitutes(() => data);
    setLoading(() => false);
    return 0;
  };
  const handleProfileCreation = async () => {
    try {
      if (!scholarId || !selectedInst || !selectedYear) {
        return toast.error("Required fields cannot be empty", { autoClose: 1200 });
      }
      const profileData = {
        scholarId: parseInt(scholarId, 10),
        instituteId: selectedInst,
        year: selectedYear,
      };

      const token = await auth.currentUser.getIdToken(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/profile/create`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = response;
      if (data.status === 200) {
        setLoading(() => true);
        const user = { ...context.user };
        user.profile = data.msg.profile;
        window.localStorage.setItem("user", JSON.stringify(user));
        context.setUser(() => user);
        navigate("/profile");
        return toast.success("Profile Created Succesfully", { autoClose: 1200 });
      }
      return toast.error("Something went wrong", { autoClose: 1200 });
    } catch (err) {
      return toast.error(err, { autoClose: 1200 });
    }
  };
  useEffect(() => {
    if (context?.user?.profile) {
      navigate("/profile");
      return;
    }
    handleInstitute();
  }, []);

  return (
    <div className={styles["create-profile"]}>
      {loading === false ? (
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
                <option value="FIRST">1st</option>
                <option value="SECOND">2nd</option>
                <option value="THIRD">3rd</option>
                <option value="FOURTH">4th</option>
              </select>
            </div>

            <div className={styles["select-details"]}>
              <h4>
                Select Institution <span className={styles["compulsory-field"]}>*</span>
              </h4>
              <select value={selectedInst} onChange={handleInstChange} required>
                <option value="">Select Institution</option>
                {institutes?.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles["select-details"]}>
              <h4>
                Student ID <span className={styles["compulsory-field"]}>*</span>
              </h4>
              <input
                type="text"
                name="scholarId"
                pattern="\d{7}"
                value={scholarId}
                onChange={(e) => setScholarId(e.target.value)}
                required
              />
            </div>
          </div>
          <button className={styles["continue-button"]} onClick={handleProfileCreation}>
            Continue
          </button>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default CreateProfile;
