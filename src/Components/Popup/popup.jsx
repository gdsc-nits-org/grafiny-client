// eslint-disable-next-line check-file/filename-naming-convention
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import UserContext from "../../Global/Auth/authContext";
import style from "./Popup.module.scss";

const Popup = ({ onClose, files }) => {
  const context = useContext(UserContext);
  const { state } = useLocation();
  const { user } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error("Please Log In", { autoClose: 1200 });
    } else if (!state) {
      navigate("/");
    }
  }, [user, state, navigate]);

  return (
    <div className={style.container}>
      <div className={style.buttoncont}>
        <button className={style.button} onClick={onClose}>
          Close
        </button>
      </div>
      <div className={style.filecontainer}>
        {files.length > 0 ? (
          files.map((file) => {
            return (
              <div key={file.id} className={style.file}>
                {file.key}
                <a href={file.url} download = {file.key}>
                  Download
                </a>
              </div>
            );
          })
        ) : (
          <div>No files available</div>
        )}
      </div>
    </div>
  );
};

export default Popup;
