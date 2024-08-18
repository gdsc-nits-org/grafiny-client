import { useContext } from "react";
import Landingstyle from "./Landing.module.scss";
import UserContext from "../../Global/Auth/authContext";

const Landing = ({ scrollToExplore }) => {
  const context = useContext(UserContext);
  const { user } = context;

  return (
    <section className={Landingstyle.main}>
      <div className={Landingstyle.header}>
        <div className={Landingstyle.title}>
          <div className={Landingstyle.text}>
            <h1>Grafiny</h1>
            {user ? (
              <>
                <h3> Welcome to Grafiny!</h3>
                <p>
                  Grafiny is a platform that allows students to share and access academic
                  resources such as notes, past papers, and more. Join us to explore a
                  treasure trove of knowledge tailored for your academic excellence.
                </p>
              </>
            ) : (
              <>
                <h3> Where Knowledge Meets Community!</h3>
                <p>
                  Imagine a place where every lecture note, every code snippet, and every
                  past question paper is right at your fingertips. Whether you are
                  cramming for finals or simply curious to dive deeper into your courses,
                  Grafiny has got you covered. Engage with a community of learners just
                  like you. Upload, share and upvote the best study materials out there.
                  With a simple click, you will transform your study sessions from
                  stressful to successful.
                </p>
              </>
            )}
          </div>
        </div>

        <div className={Landingstyle.imageLand}>
          <img src="/assets/Group.png" alt="Grafiny Landing" />
        </div>
      </div>

      <div className={Landingstyle.buttonLand}>
        <button className={Landingstyle.btn} onClick={scrollToExplore}>
          Get started
        </button>
      </div>
    </section>
  );
};

export default Landing;
