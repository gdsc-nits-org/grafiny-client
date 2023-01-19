import { Explore, Landing } from "../../Components";
import style from "./Home.module.scss";

const Home = () => {
  return (
    <main className={style.home}>
      <div>
        <Landing />
      </div>
      <div>
        <Explore />
      </div>
    </main>
  );
};

export default Home;
