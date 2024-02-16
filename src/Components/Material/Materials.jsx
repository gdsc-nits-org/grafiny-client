import React from "react";
import style from "./Materials.module.scss";

const Materials = ({ name }) => {
  return (
    <div className={style.folders}>
      <div className={style.foldersbox}>
        <img src="./images/folder.png" alt="" className="" />
        <div>
          {" "}
          <p className={style.materialtitle}> {name}</p>
        </div>
      </div>
    </div>
  );
};

export default Materials;
