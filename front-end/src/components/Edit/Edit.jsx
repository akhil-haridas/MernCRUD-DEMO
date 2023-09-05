import React, { useState, useEffect } from "react";
import zxcvbn from "zxcvbn";
import {
  getCities,
  getCountries,
  getLanguages,
  getStates,
  updateUser,
} from "../../utils/api";
import Spinner from "../../components/Fallback/Spinner";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const Edit = ({ onEditClick, userData }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({ score: 0 });
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isActive, setIsActive] = useState(userData.IsActive);

  
  useEffect(() => {
    fetchDatas();
  }, []);

  const fetchDatas = async () => {
    const responseCountries = await getCountries();
    const responseLanguages = await getLanguages();
    const responseCities = await getCities(userData.State);
    const responseStates = await getStates(userData.Country);

      const selectedCountryName = responseCountries.find(
        (country) => country._id === userData.Country
      )?.Name;
      const selectedStateName = responseStates.find(
        (state) => state._id === userData.State
      )?.Name;
      const selectedCityName = responseCities.find(
        (city) => city._id === userData.City
    )?.Name;
      const userLanguages = responseLanguages.filter((language) =>
        userData.Languages.includes(language._id)
      );
    
    setCountries(responseCountries);
    setStates(responseStates);
    setCities(responseCities);
    setLanguages(responseLanguages);
     setSelectedCountry({ value: userData.Country, label: selectedCountryName });
  setSelectedState({ value: userData.State, label: selectedStateName });
  setSelectedCity({ value: userData.City, label: selectedCityName });
   setSelectedLanguages(
     userLanguages.map((language) => ({
       value: language._id,
       label: language.Name,
     }))
   );
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    if (!newEmail) {
      setEmailError("");
    } else if (!validateEmail(newEmail)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleCountryChange = async (selectedOption) => {
    setSelectedCountry(selectedOption);
    setSelectedState(null);
    setSelectedCity(null);

    if (selectedOption) {
      const response = await getStates(selectedOption.value);
      setStates(response);
    } else {
      setStates([]);
    }
  };

  const handleStateChange = async (selectedOption) => {
    setSelectedState(selectedOption);
    setSelectedCity(null);

    if (selectedOption) {
      const response = await getCities(selectedOption.value);
      setCities(response);
    } else {
      setCities([]);
    }
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    const passwordStrength = zxcvbn(newPassword);
    setPasswordStrength(passwordStrength);
    const score = passwordStrength.score;
    setPassword(newPassword);
  };

  const getPasswordStrengthLabel = (score) => {
    switch (score) {
      case 0:
        return "Very Weak";
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Strong";
      case 4:
        return "Very Strong";
      default:
        return "Very Weak";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = {
      FullName: event.target.fullname.value,
      Email: event.target.email.value,
      Password: password,
      Country: selectedCountry ? selectedCountry.value : null,
      State: selectedState ? selectedState.value : null,
      City: selectedCity ? selectedCity.value : null,
      Languages: selectedLanguages.map((language) => language.value),
      IsActive: isActive,
      userID: userData._id,
    };

    try {
      await updateUser(formData);
      onEditClick();
      event.target.reset();
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageChange = (selectedOptions) => {
    setSelectedLanguages(selectedOptions);
  };

  const handleConfirmPasswordChange = (event) => {
    const newPassword = event.target.value;
    if (newPassword === password) {
      setConfirmPassword(newPassword);
      setConfirmPasswordError("");
    } else {
      setConfirmPassword("");
      setConfirmPasswordError("Passwords do not match.");
    }
  };

  const handleActiveChange = (event) => {
    setIsActive(event.target.checked);
  };

  return (
    <>
      {isLoading && <Spinner />}

      <div
        className="loader2"
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
                                onChange={handleEmailChange}
                              />
                              {emailError && (
                                <span className="error-message">
                                  {emailError}
                                </span>
                              )}
                            </p>
                            <p>
                              <label>Password</label>
                              <input
                                type="password"
                                placeholder="password"
                                name="password"
                                defaultValue={userData.Password}
                                onChange={handlePasswordChange}
                              />
                            </p>
                            <div className="password-strength-bar">
                              <div
                                className={`strength strength-${passwordStrength.score}`}
                                style={{
                                  width: `${
                                    (passwordStrength.score + 1) * 20
                                  }%`,
                                }}
                              ></div>
                            </div>
                            <p>
                              <label>Confirm Password</label>
                              <input
                                type="password"
                                placeholder="Retype password"
                                name="confirmpassword"
                                onChange={handleConfirmPasswordChange}
                                defaultValue={userData.Password}
                              />
                              {confirmPasswordError && (
                                <span className="error-message">
                                  {confirmPasswordError}
                                </span>
                              )}
                            </p>

                            <p>
                              <label>Country</label>
                              <Select
                                value={selectedCountry}
                                onChange={handleCountryChange}
                                options={countries.map((country) => ({
                                  value: country._id,
                                  label: country.Name,
                                }))}
                                components={animatedComponents}
                              />
                            </p>
                            <p>
                              <label>State</label>
                              <Select
                                value={selectedState}
                                onChange={handleStateChange}
                                options={states.map((state) => ({
                                  value: state._id,
                                  label: state.Name,
                                }))}
                                components={animatedComponents}
                              />
                            </p>
                            <p>
                              <label>City</label>
                              <Select
                                value={selectedCity}
                                onChange={handleCityChange}
                                options={cities.map((city) => ({
                                  value: city._id,
                                  label: city.Name,
                                }))}
                                components={animatedComponents}
                              />
                            </p>
                            <p>
                              <label>Languages</label>
                              <Select
                                isMulti
                                options={languages.map((language) => ({
                                  value: language._id,
                                  label: language.Name,
                                }))}
                                components={animatedComponents}
                                onChange={handleLanguageChange}
                                value={selectedLanguages}
                              />
                            </p>
                            <p>
                              <label className="checkbox-label">
                                Active
                                <input
                                  type="checkbox"
                                  name="active"
                                  className="checkbox-input"
                                  checked={isActive}
                                  onChange={handleActiveChange}
                                />
                                <span className="checkbox-custom"></span>
                              </label>
                            </p>
                            <div className="sub-new">
                              <button
                                className="boxed-btn"
                                style={{
                                  marginRight: "1rem",
                                  background: "red",
                                }}
                                onClick={onEditClick}
                              >
                                Cancel
                              </button>
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
                            </div>
                          </form>
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
