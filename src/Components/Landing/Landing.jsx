import Landingstyle from "./Landing.module.scss";

const Landing = () => {
  return (
    <section className={Landingstyle.main}>
      <div className={Landingstyle.header}>
        <div className={Landingstyle.title}>
          <div className={Landingstyle.text}>
            <h1>Grafiny</h1>
            <h3>Lorem ipsum dolor sit amet consectetur.</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa pariatur harum
              maiores? Vitae repellendus, cumque voluptatibus iure itaque accusantium.
              Delectus, rem. Quae consequuntur voluptatum nam optio fugiat alias aliquam,
              vitae explicabo eos quibusdam praesentium, perspiciatis laboriosam a
              voluptatem saepe officiis.
            </p>
          </div>
        </div>

        <div className={Landingstyle.imageLand}>
          <img src="/assets/Group.png" alt="Grafiny Landing" />
        </div>
      </div>

      <div className={Landingstyle.buttonLand}>
        <button className={Landingstyle.btn}>Get started</button>
      </div>
    </section>
  );
};

export default Landing;
