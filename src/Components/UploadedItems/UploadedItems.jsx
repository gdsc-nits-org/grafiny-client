import { Icon } from "@iconify/react";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import style from "./UploadedItems.module.scss";
import Popup from "../Popupp/Popup";

const UploadedItem = ({ item, deleteItem }) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  return (
    <div className={style.itemcontainer}>
      {showPopup && (
        <Popup files={item.file} onClose={togglePopup} materialName={item?.name} />
      )}
      <div className={style.leftpart}>
        <div className={style.bookiconcontainer}>
          <img className={style.bookicon} src="/assets/bookicon.png" alt="bookicon" />
        </div>
        <div className={style.booktitlecontainer}>
          <div className={style.title}>{item?.name}</div>
        </div>
      </div>
      <div className={style.rightpart}>
        <div className={style.item}>{item?.createdAt?.split("T")[0]}</div>
        <div
          className={style.download}
          onClick={togglePopup}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " " ? togglePopup() : null)}
        >
          <Icon icon="uiw:arrow-down" />
        </div>
        <div
          className={style.delete}
          onKeyDown={(e) =>
            e.key === "Enter" || e.key === " " ? deleteItem(item?.id) : null
          }
          onClick={() => deleteItem(item?.id)}
        >
          {" "}
          <FaTrashAlt />
        </div>
      </div>
    </div>
  );
};

export default UploadedItem;
