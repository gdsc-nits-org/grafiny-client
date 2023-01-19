import { Explore, Landing } from "../../Components";
import style from "./Home.module.scss";

const Home = () => {
  return (
    <main className={style.home}>
      <Landing />
      <Explore />
    </main>
  );
};

export default Home;
