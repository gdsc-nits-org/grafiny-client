/* eslint-disable import/no-absolute-path */
import React from "react";
// eslint-disable-next-line import/no-unresolved
import HeroBanner from "./Group.png";
import Landingstyle from "./Landing.module.scss";

const Landing = () => {
  return (
    <div className={Landingstyle.header}>
            <img src={HeroBanner} alt="img" />
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


      {/* <div className={Landingstyle.button}> */}
        <button className={Landingstyle.btn}>Get started</button>
      {/* </div> */}
    </div>
  );
};

export default Landing;
