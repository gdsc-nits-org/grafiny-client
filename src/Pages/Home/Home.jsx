import { Button } from "../../Components";
import Institutions from "../../Components/Institutions/Institutions";

import style from "./Home.module.scss";

const Home = () => {
  return (
    <main className={style.home}>
      <h1>Home Page for Grafiny</h1>
      <Button type="button" />
      <Institutions />
    </main>
  );
};

export default Home;
