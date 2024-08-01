import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import UserContext from "../../Global/Auth/authContext";
import { Materials, Popup, Loading } from "../../Components";
import Upload from "../Upload/Upload";
import style from "./Material.module.scss";

const Material = () => {
  const { state } = useLocation();
  const context = useContext(UserContext);
  const [items, setItems] = useState([]);
  const { loading, user } = context;
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
      toast.error("Please Log In", { autoClose: 1200 });
    } else if (!state) {
      navigate("/");
      toast.error("Please Log In", { autoClose: 1200 });
    } else {
      setItems(() => state?.items);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleClosePopup = () => {
    setSelectedItem(null);
  };

  return (
    <section className={style.material}>
      {loading === false ? (
        <div>
          <div className={style.arrowContainer}>
            <h2 className={style.dhead}>Materials</h2>
          </div>

          <button
            className={style["add-items"]}
            onClick={togglePopup}
            aria-label="Add Items"
          >
            {showPopup ? <Icon icon="mdi:close" /> : <Icon icon="mdi:plus" />}
          </button>

          <div>
            <div>
              {showPopup && (
                <Upload
                  onClose={togglePopup}
                  department={state?.departmentName}
                  semester={state?.semNumber}
                  courseId={state?.courseId}
                  topic={state?.topicName}
                  topicOptions={state?.topics}
                />
              )}
            </div>
            <div className={style.itemsContainer}>
              {items?.map((item) => (
                <div key={item.id}>
                  <button
                    onClick={() => handleItemClick(item)}
                    aria-label="test"
                    style={{ background: "none", border: "none" }}
                  >
                    <Materials name={item.name} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          {selectedItem && <Popup files={selectedItem.file} onClose={handleClosePopup} />}
        </div>
      ) : (
        <Loading />
      )}
    </section>
  );
};

export default Material;
