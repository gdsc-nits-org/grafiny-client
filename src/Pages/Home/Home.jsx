import { Button, Explore, Footer } from "../../Components";
import style from "./Home.module.scss";

const Home = () => {
  return (
    <main className={style.home}>
      <h1>Home Page for Grafiny by GDSC NITS</h1>
      <Button type="button" />
      <div>
        <Explore />
      </div>
      <Footer />
    </main>
  );
};

export default Home;
