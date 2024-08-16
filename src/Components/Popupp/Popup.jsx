import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import UserContext from "../../Global/Auth/authContext";
import style from "./Popup.module.scss";

const Popup = ({ onClose, files, materialName }) => {
  const context = useContext(UserContext);
  const { user } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error("Please Log In", { autoClose: 1200 });
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [user, navigate]);

  return (
    <div className={style.popupContainer}>
      <div className={style.popupContent}>
        <div className={style.booktitlecontainer}>
          <div className={style.title}>{materialName}</div>
          <div className={style.buttoncont}>
            <button onClick={onClose} aria-label="close" className={style.buttoncont}>
              <Icon icon="mdi:close" />
            </button>
          </div>
        </div>

        <div className={style.itemcontainer}>
          {files?.length > 0 ? (
            files?.map((file) => {
              return (
                <div key={file?.id} className={style.file}>
                  <div className={style.bookiconcontainer}>
                    <img
                      className={style.bookicon}
                      src="/assets/bookicon.png"
                      alt="bookicon"
                    />
                    <p className={style.filekey}> {file?.key}</p>
                  </div>
                  <div className={style.buttoncont}>
                    <a href={file?.url} download={file?.key} target="_blank">
                      <button>Download</button>
                    </a>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No files available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
