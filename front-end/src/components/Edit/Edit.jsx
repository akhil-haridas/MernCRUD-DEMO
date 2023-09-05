import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getCities,
  getCountries,
  getLanguages,
  getStates,
  updateUser,
} from "../../utils/api";
import Spinner from "../../components/Fallback/Spinner";

const Edit = ({ onEditClick, userData }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    const response = await getCountries();
    const response2 = await getLanguages();
    const response3 = await getCities(userData.State);
    const response4 = await getStates(userData.Country);

    setCountries(response);
    setStates(response4);
    setCities(response3);
    setLanguages(response2);
    setSelectedCountry(userData.Country);
    setSelectedState(userData.State);
    setSelectedCity(userData.City);
  };

  const handleCountryChange = async (event) => {
    const countryId = event.target.value;
    setSelectedCountry(countryId);
    const response = await getStates(countryId);
    setStates(response);
  };

  const handleStateChange = async (event) => {
    const stateId = event.target.value;
    setSelectedState(stateId);
    const response = await getCities(stateId);
    setCities(response);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = {
      FullName: event.target.fullname.value,
      Email: event.target.email.value,
      Password: event.target.password.value,
      Country: selectedCountry,
      State: selectedState,
      City: selectedCity,
      userID:userData._id
    };

    try {
      const response = await updateUser(formData);
      onEditClick()
      event.target.reset();
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Spinner />}

      <div
        className="loader"
        style={{
          paddingBottom: "70px",
          background: "#1c1a1a7a",
        }}
      >
        <div className="close-modal" onClick={onEditClick}>
          <box-icon
            name="x-circle"
            color="#ffffff"
            style={{ width: "50px", height: "50px" }}
            onClick={onEditClick}
          ></box-icon>
        </div>
        <div
          className="container"
          style={{
            maxWidth: "700px",
            paddingBottom: "6rem",
            paddingTop: "6rem",
          }}
        >
          <div className="row" style={{ display: "block" }}>
            <div className="">
              <div className="checkout-accordion-wrap">
                <div className="accordion" id="accordionExample">
                  <div className="card single-accordion">
                    <div className="card-header" id="headingOne">
                      <h5 className="mb-0">
                        <button
                          className="btn btn-link"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Edit customer
                        </button>
                      </h5>
                    </div>
                    <div
                      id="collapseOne"
                      className="collapse show"
                      aria-labelledby="headingOne"
                      data-parent="#accordionExample"
                    >
                      <div className="card-body">
                        <div className="billing-address-form">
                          <form onSubmit={handleSubmit}>
                            <p>
                              <label>Full Name</label>
                              <input
                                type="text"
                                placeholder="Fullname"
                                name="fullname"
                                defaultValue={userData.FullName}
                              />
                            </p>
                            <p>
                              <label>Email</label>
                              <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                defaultValue={userData.Email}
                              />
                            </p>
                            <p>
                              <label>Password</label>
                              <input
                                type="password"
                                placeholder="password"
                                name="password"
                                defaultValue={userData.Password}
                              />
                            </p>
                            <p>
                              <label>Confirm Password</label>
                              <input
                                type="password"
                                placeholder="Retype password"
                                name="confirmpassword"
                                defaultValue={userData.Password}
                              />
                            </p>
                            <p>
                              <label>Country</label>
                              <select
                                onChange={handleCountryChange}
                                value={selectedCountry}
                              >
                                <option>Countries</option>
                                {countries.map((country) => (
                                  <option key={country._id} value={country._id}>
                                    {country.Name}
                                  </option>
                                ))}
                              </select>
                            </p>
                            <p>
                              <label>State</label>
                              <select
                                onChange={handleStateChange}
                                value={selectedState}
                              >
                                <option value="">Select a State</option>
                                {states.map((state) => (
                                  <option key={state._id} value={state._id}>
                                    {state.Name}
                                  </option>
                                ))}
                              </select>
                            </p>
                            <p>
                              <label>City</label>
                              <select
                                onChange={(e) =>
                                  setSelectedCity(e.target.value)
                                }
                                value={selectedCity}
                              >
                                <option value="">Select a City</option>
                                {cities.map((city) => (
                                  <option key={city._id} value={city._id}>
                                    {city.Name}
                                  </option>
                                ))}
                              </select>
                            </p>
                            <p>
                              <label>Languages</label>
                              <select>
                                <option value="">Select a Language</option>
                                {languages.map((language) => (
                                  <option
                                    key={language._id}
                                    value={language._id}
                                  >
                                    {language.Name}
                                  </option>
                                ))}
                              </select>
                            </p>
                            <button
                              className="boxed-btn"
                              style={{
                                marginRight: "1rem",
                                background: "green",
                              }}
                              type="submit"
                            >
                              Update
                            </button>
                          </form>
                        </div>
                        <div className="sub-new">
                          <Link
                            className="boxed-btn"
                            style={{ marginRight: "1rem", background: "red" }}
                          >
                            Cancel
                          </Link>
                          <Link
                            className="boxed-btn"
                            style={{ marginRight: "1rem", background: "green" }}
                            type="submit"
                          >
                            Create
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
