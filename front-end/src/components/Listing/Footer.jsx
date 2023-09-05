import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="copyright">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <p>
              Copyrights © 2023 -{" "}
              <Link to="https://github.com/akhil-haridas/Image-Management">
                Image Management App
              </Link>
              , All Rights Reserved.
              <br />
              Created By -{" "}
              <Link to="https://github.com/akhil-haridas">4khil-haridas</Link>
            </p>
          </div>
          <div className="col-lg-6 text-right col-md-12">
            <div className="social-icons">
              <ul>
                <li>
                  <Link to="https://github.com/akhil-haridas" target="_blank">
                    <box-icon
                      name="github"
                      type="logo"
                      color="#ffffff"
                    ></box-icon>
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://www.linkedin.com/in/akhil-haridas-a8447125b"
                    target="_blank"
                  >
                    <box-icon
                      name="linkedin-square"
                      type="logo"
                      color="#ffffff"
                    ></box-icon>
                  </Link>
                </li>
                <li>
                  <Link target="_blank">
                    <box-icon
                      name="instagram-alt"
                      type="logo"
                      color="#ffffff"
                    ></box-icon>
                  </Link>
                </li>
                <li>
                  <Link target="_blank">
                    <box-icon
                      name="twitter"
                      type="logo"
                      color="#ffffff"
                    ></box-icon>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
