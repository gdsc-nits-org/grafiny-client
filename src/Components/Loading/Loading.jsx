import { PacmanLoader } from "react-spinners";
import { useEffect } from "react";
import style from "./Loading.module.scss";

const Loading = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className={style.loadingcontainer}>
      <PacmanLoader color="red" size={50} margin={8} />
    </div>
  );
};

export default Loading;
