import React from "react";
import { Link } from "react-router-dom";
import "./courses.scss";
import book from "../../Assets/Images/book.png";
import bookmark from "../../Assets/Images/bookmark.png";
import backArrow from "../../Assets/Images/arrow.png";

const Courses = () => {
  const coursesData = [
    {
      insti: "National Institute of Technology, Silchar",
      subjectName: "Chemistry",
    },
    {
      insti: "National Institute of Technology, Warangal",
      subjectName: "Chemistry",
    },
    {
      insti: "Indian Institute of Technology, Delhi",
      subjectName: "Physics",
    },
    {
      insti: "Indian Institute of Technology, Bombay",
      subjectName: "Physics",
    },
    {
      insti: "Indian Institute of Technology, Bombay",
      subjectName: "Chemistry",
    },
    {
      insti: "Indian Institute of Technology, Bombay",
      subjectName: "Maths",
    },
    {
      insti: "Indian Institute of Technology, Bombay",
      subjectName: "Physics",
    },
    {
      insti: "Indian Institute of Technology, Bombay",
      subjectName: "Chemistry",
    },
    {
      insti: "Indian Institute of Technology, Bombay",
      subjectName: "Maths",
    },
    {
      insti: "Indian Institute of Technology, Bombay",
      subjectName: "Physics",
    },
  ];

  return (
    <div className="courses-hero">
      <div className="courses-title">
        <div className="courses-title-heading">
          <Link to="/">
            <img src={backArrow} alt="left arrow" className="courses-fa" />
          </Link>
          <div className="courses-title-text">Courses</div>
        </div>
      </div>
      <div className="courses-card-container">
        {coursesData.map((data) => {
          return (
            <div className="courses-card">
              <img src={bookmark} alt="bookmark" className="courses-card-bm" />
              <div className="courses-card-subject">{data?.subjectName}</div>
              <img src={book} alt="book" className="courses-card-img" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Courses;
