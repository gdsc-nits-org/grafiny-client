import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UserContext from "../../Global/Auth/authContext";
import styles from "./CreateDepartment.module.scss";

const CreateDepartment = ({
  onClose,
  instituteName,
  departments,
  setDepartments,
  setLoading,
}) => {
  const { auth } = useContext(UserContext);
  const [name, setName] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!name || !instituteName) {
        toast.error("Please Fill Out The Required Fields", { autoClose: 1200 });
      }
      setLoading(true);
      const token = await auth?.currentUser?.getIdToken(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/department/create`,
        {
          name,
          instituteName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = response;
      if (data.status !== 200) {
        setLoading(false);
        toast.error(data.msg, { autoClose: 1200 });
      }
      const updatedDepartments = [...departments, data.msg.department];
      window.localStorage.setItem("departments", JSON.stringify(updatedDepartments));
      setDepartments(() => updatedDepartments);

      setName(() => "");
      setLoading(() => false);
      toast.success("Department Created Successfully", { autoClose: 1200 });
      onClose();
    } catch (err) {
      setLoading(() => false);
      toast.error("Something Went Wrong", { autoClose: 1200 });
    }
  };

  return (
    <div className={styles["main-container"]}>
      <div className={styles.container}>
        <h2>Create Department</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="instituteName">Institute Name:</label>
            <select id="instituteName" disabled>
              <option defaultValue={instituteName}>{instituteName}</option>
            </select>
            <label htmlFor="name">Department Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
