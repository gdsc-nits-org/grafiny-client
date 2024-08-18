import { useRef } from "react";
import { Explore, Landing, Institutions } from "../../Components";
import style from "./Home.module.scss";

const Home = () => {
  const exploreRef = useRef(null);

  const scrollToExplore = () => {
    if (exploreRef.current) {
      const targetPosition =
        exploreRef.current.getBoundingClientRect().top + window.scrollY;
      const isLaptopView = window.matchMedia("(min-width: 1024px)").matches;

      let adjustedPosition = targetPosition;
      if (isLaptopView) {
        const offset = 84;
        adjustedPosition -= offset;
      }

      window.scrollTo({ top: adjustedPosition, behavior: "smooth" });
    }
  };

  return (
    <main className={style.home}>
      <Landing scrollToExplore={scrollToExplore} />
      <div ref={exploreRef}>
        <Explore />
      </div>
      <Institutions />
    </main>
  );
};

export default Home;
