import topicstyle from "./Topics.module.scss";

const Topics = ({ tname }) => {
  return (
    <div className={topicstyle.container}>
      <div className={topicstyle.topicbox}>
        <button className={topicstyle.boxes}>{tname}</button>
      </div>
    </div>
  );
};

export default Topics;
