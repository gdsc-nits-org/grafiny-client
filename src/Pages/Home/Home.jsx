import { Button, Explore } from "../../Components";
import style from "./Home.module.scss";

const Home = () => {
  return (
    <main className={style.home}>
      <h1>Home Page for Grafiny</h1>
      <Button type="button" />
      <div>
        <Explore />
      </div>
    </main>
  );
};

export default Home;
