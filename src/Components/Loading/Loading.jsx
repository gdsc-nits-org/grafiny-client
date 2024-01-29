import { PacmanLoader } from "react-spinners";
import style from "./Loading.module.scss";
const Loading = () => {
  return (
    <div className={style.loadingcontainer}>
      <PacmanLoader color="red" size={50} margin={8} />
    </div>
  );
};

export default Loading;
