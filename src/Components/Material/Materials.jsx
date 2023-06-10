import React from "react";
import { Icon } from "@iconify/react";
import style from "./Materials.module.scss";

const record = [
  {
    caption: "Material 123",
  },

  {
    caption: "Material 123",
  },

  {
    caption: "Material 123",
  },
  {
    caption: "Material 123",
  },

  {
    caption: "Material 123",
  },

  {
    caption: "Material 123",
  },

  {
    caption: "Material 123",
  },

  {
    caption: "mMaterial 123",
  },
];

const Materials = () => {
  return (
    <>
      <div className={style.iconarrow}>
        <Icon icon="mdi:arrow-left" width="37" height="37" color="rgb(116, 114, 114)" />
      </div>
      <div className={style.materialcontainer}>
        <p>Materials</p>
      </div>
      <div className={style.folders}>
        {record.map((data) => {
          return (
            <div className={style.foldersbox}>
              <img src="./images/folder.png" alt="" className="" />
              <div>
                {" "}
                <p className={style.materialtitle}> {data.caption}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Materials;
