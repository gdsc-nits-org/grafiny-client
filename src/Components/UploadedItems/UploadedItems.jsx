import style from "./UploadedItems.module.scss";

const UploadedItem = ({ item }) => {
  return (
    <div className={style.itemcontainer}>
      <div className={style.leftpart}>
        <div className={style.bookiconcontainer}>
          <img className={style.bookicon} src="/assets/bookicon.png" alt="bookicon" />
        </div>
        <div className={style.booktitlecontainer}>
          <div className={style.title}>{item.name || "Data Structures"}</div>
        </div>
      </div>
      <div className={style.rightpart}>
        <div className={style.item}>{item.lastModified || "00/00/0000"}</div>
      </div>
    </div>
  );
};

export default UploadedItem;
