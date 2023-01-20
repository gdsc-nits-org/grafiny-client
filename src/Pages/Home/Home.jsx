import { Explore, Landing } from "../../Components";
import Institutions from "../../Components/Institutions/Institutions";
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
