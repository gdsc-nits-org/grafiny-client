import Lottie from "lottie-react";
import { useEffect } from "react";
import customLoader from "./grafiny-loader.json";
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
      <Lottie animationData={customLoader} loop />
    </div>
  );
};

export default Loading;
