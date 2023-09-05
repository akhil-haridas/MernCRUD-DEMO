import React from "react";
import { Link } from "react-router-dom";

const Section = () => {
  return (
    <div className="hero-area hero-bg">
      <div className="container">
        <div className="row">
          <div className="col-lg-9 offset-lg-2 text-center">
            <div className="hero-text">
              <div className="hero-text-tablecell">
                <p className="subtitle">Dot N Key IT Solutions</p>
                <h1>MERN User Management App</h1>
                <div className="hero-btns">
                  <Link to="/customers" className="boxed-btn">
                    Customers
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
