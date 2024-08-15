import style from "./AboutUs.module.scss";
import developers from "../../db/ourteam.json";

const AboutUs = () => {
  return (
    <div className={style.background}>
      <h2 className={style.header}>
        ABOUT <span className={style.us}>US</span>
      </h2>
      <div className={style.LeftBox}>
        <img src="/assets/grafiny.png" alt="grafiny" />
        <p className={style.LeftContent}>
          The name Grafiny is derived from graphite and the relation between graphite and
          paper is too well known. Grafiny is a platform crafted with dedication and
          innovation by the Google Developer Student Clubs (GDSC) at NIT Silchar. Our
          mission is to create a centralized hub where students can easily access and
          share study materials, including notes, codes and past exam papers, all
          contributed by students . It empowers students to not only access valuable
          resources but also contribute to the learning community by uploading their own
          materials and providing feedback through upvotes and comments. It reflects our
          commitment to leveraging technology to support education and foster
          collaboration among students.
        </p>
      </div>
      <div className={style.middleBox}>
        <div className={style.middleBoxLeft}></div>
        <div className={style.middleBoxRight}></div>
      </div>
      <div className={style.RightBox}>
        <h2>OUR TEAM</h2>
        {developers.map((developer, index) => (
          <div
            key={index}
            className={`${style.developer} ${
              index % 2 === 0 ? style.developerLeft : style.developerRight
            }`}
          >
            <a href={developer.linkedin} target="_blank" rel="noreferrer">
              <img
                src={developer.photo}
                alt={developer.name}
                className={style.developerImg}
              />
            </a>
            <div className={style.developerInfo}>
              <h3>{developer.name}</h3>
              <p>{developer.designation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
