import React from "react";
import Menu from "./Menu";
import "../styles.css";


const Base=({
    title="my title",
    description="my description",
    className="bg-dark text-white p-4",
    children
})=>{
    return (
      <div>
        <Menu />
        <div className="container-fluid">
          <div className="jumbotron bg-dark text-white text-center">
            <h2 className="display-4">{title}</h2>
            <p className="lead">{description}</p>
          </div>
          <div className={className}>{children}</div>
        </div>
        <footer className="footer bg-dark mt-auto py-3">
          <div className="container-fluid bg-success text-white text-center">
            <h4 >if u got any question ,feel free to reach out</h4>
            <button className="btn btn-warning btn-lg">contact us</button>
          </div>
          <div className="container">
            <span className="text-muted">
              an amazing <span className="text-white"> mern</span> bootcamp
            </span>
          </div>
        </footer>
      </div>
    );
}
export default Base;