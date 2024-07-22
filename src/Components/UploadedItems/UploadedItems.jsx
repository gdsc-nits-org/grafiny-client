import style from "./UploadedItems.module.scss";
import { Icon } from "@iconify/react";
import { FaTrashAlt } from 'react-icons/fa';
const UploadedItem = ({item, deleteItem }) => {
  return (
    <div className={style.itemcontainer}>
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
        <div className={style.download}> <Icon icon="uiw:arrow-down" /></div>
        <div className={style.delete}  onClick={() => deleteItem(item?.id)}>  <FaTrashAlt /></div>
      </div>
    </div> 
  );  
};

export default UploadedItem;
