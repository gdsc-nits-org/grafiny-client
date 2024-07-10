import style from "./UploadedItems.module.scss";

const UploadedItem = ({ item,deleteItem }) => {
  return (
    <div className={style.itemcontainer}>
      <div className={style.leftpart}>
        <div className={style.bookiconcontainer}>
          <img className={style.bookicon} src="/assets/bookicon.png" alt="bookicon" />
        </div>
        <div className={style.booktitlecontainer}>
          <div className={style.title}>{item.name}</div>
        </div>
      </div>
      <div className={style.rightpart}>
        <div className={style.item}>{item.createdAt.split("T")[0]}</div>
      </div>
    </div>
  );
};

export default UploadedItem;
