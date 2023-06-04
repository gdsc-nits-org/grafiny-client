import style from "./AboutUs.module.scss";
const AboutUs = () => {
  return (
    <div className={style.background}>
      <h2 className={style.header}>
        ABOUT <span className={style.us}>US</span>
      </h2>
      <div className={style.LeftBox}>
        <div className={style.ImgContainer}>
          <div className={style.LeftImg}></div>
        </div>
        <p className={style.LeftContent}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa pariatur harum
          maiores? Vitae repellendus, cumque voluptatibus iure itaque accusantium.
          Delectus, rem. Quae consequuntur voluptatum nam optio fugiat alias aliquam,
          vitae explicabo eos quibusdam praesentium, perspiciatis laboriosam a voluptatem
          saepe officiis. Quae consequuntur voluptatum nam optio fugiat alias aliquam,
          vitae explicabo eos quibusdam praesentium, perspiciatis laboriosam a voluptatem
          saepe officiis.
        </p>
      </div>
      <div className={style.middleBox}>
        <div className={style.middleBoxLeft}></div>
        <div className={style.middleBoxRight}></div>
      </div>
      <div className={style.RightBox}>
        <div className={style.ImgContainer}>
          <div className={style.RightImg}></div>
        </div>
        <p className={style.RightContent}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa pariatur harum
          maiores? Vitae repellendus, cumque voluptatibus iure itaque accusantium.
          Delectus, rem. Quae consequuntur voluptatum nam optio fugiat alias aliquam,
          vitae explicabo eos quibusdam praesentium, perspiciatis laboriosam a voluptatem
          saepe officiis. Quae consequuntur voluptatum nam optio fugiat alias aliquam,
          vitae explicabo eos quibusdam praesentium, perspiciatis laboriosam a voluptatem
          saepe officiis.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
