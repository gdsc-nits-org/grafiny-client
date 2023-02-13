import React from "react";
import "./Institutions.scss";
import dp from "../../../public/images/nitsLogo.png";

const dummyData = [
  {
    insti: "National Institute of Technology, Silchar",
    pfp: dp,
  },
  {
    insti: "National Institute of Technology, Warangal",
    pfp: dp,
  },
  {
    insti: "Indian Institute of Technology, Delhi",
    pfp: dp,
  },
  {
    insti: "Indian Institute of Technology, Bombay",
    pfp: dp,
  },
];

const Institutions = () => {
  return (
    <div className="insti-main">
      <div className="insti-title-container">
        <div className="insti-title">Institutions</div>
        <div className="title-search-box">
          <form>
            <input
              type="text"
              placeholder="Search Institutions"
              className="title-search-box-search"
            />
            <button type="submit" className="title-search-box-button">
              <i className="fa fa-search" />
            </button>
          </form>
        </div>
      </div>
      <div className="insti-card-container">
        {dummyData.map((data) => {
          return (
            <div className="insti-card">
              <img src={data?.pfp} alt="institute logo" className="insti-card-img" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Institutions;
