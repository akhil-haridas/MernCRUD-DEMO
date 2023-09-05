import React from "react";
import { Link } from "react-router-dom";

const Head = ({ active }) => {

  return (
    <div className="top-header-area" id="sticker">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-sm-12">
            <div className="main-menu-wrap">
              <nav className="main-menu">
                <ul>
                  <li
                    className={
                      active === "Home" ? `active current-list-item` : ""
                    }
                  >
                    <Link to="/">Home</Link>
                  </li>
                  <li
                    className={
                      active === "customers" ? `active current-list-item` : ""
                    }
                  >
                    <Link to="/customers">Customers</Link>
                  </li>
                  <li
                    className={
                      active === "Adduser" ? `active current-list-item` : ""
                    }
                  >
                    <Link to="/adduser">
                      <box-icon name="user" color="#ffffff"></box-icon>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Head;
