import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import topicstyle from "./Topics.module.scss";

const Topics = ({ tname }) => {
  const navigate = useNavigate();
  const navigateTo = () => {
    navigate(-1);
  };
  return (
    <div className={topicstyle.container}>
      <div className={topicstyle.arrow}>
        <BsArrowLeft onClick={navigateTo} className={topicstyle.arrowicon} />
      </div>
      <div className={topicstyle.topicbox}>
        <button className={topicstyle.boxes}>{tname}</button>
      </div>
    </div>
  );
};

export default Topics;
