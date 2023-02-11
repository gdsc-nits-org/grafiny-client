import React from "react";
import { Icon } from "@iconify/react";
import style from "./Materials.module.scss";
import folderpic from "../../Assets/Images/folder.png";

const record = [
  {
    caption: "Material 123",
    image: folderpic,
  },

  {
    caption: "Material 123",
    image: folderpic,
  },

  {
    caption: "Material 123",
    image: folderpic,
  },
  {
    caption: "Material 123",
    image: folderpic,
  },

  {
    caption: "Material 123",
    image: folderpic,
  },

  {
    caption: "Material 123",
    image: folderpic,
  },

  {
    caption: "Material 123",
    image: folderpic,
  },

  {
    caption: "mMaterial 123",
    image: folderpic,
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
              <img src={data?.image} alt="" className="" />
              <div>
                {" "}
                <span>{data.caption}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Materials;
