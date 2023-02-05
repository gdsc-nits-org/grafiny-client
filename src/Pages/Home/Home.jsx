import { Explore, Landing, Institutions } from "../../Components";

import style from "./Home.module.scss";

const Home = () => {
  return (
    <main className={style.home}>
      <Landing />
      <Explore />
      <Institutions />
    </main>
  );
};

export default Home;
