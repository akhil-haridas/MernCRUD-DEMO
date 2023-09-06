import React, { useState, useEffect } from "react";
import zxcvbn from "zxcvbn";
import Swal from "sweetalert2";
import {
  createUser,
  getCountries,
  getStates,
  getCities,
  getLanguages,
} from "../../utils/api";
import Spinner from "../../components/Fallback/Spinner";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const Create = ({ onAddClick }) => {
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

  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  useEffect(() => {
    fetchCountries();
    fetchLanguages();
  }, []);

  const fetchCountries = async () => {
    const response = await getCountries();
    setCountries(response);
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

  const fetchLanguages = async () => {
    const response = await getLanguages();
    setLanguages(response);
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
    const password = event.target.value;
    const passwordStrength = zxcvbn(password);
    setPasswordStrength(passwordStrength);
    const score = passwordStrength.score;
    setPassword(password);
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
  const isFormValid = () => {
    return (
      selectedCountry &&
      selectedState &&
      selectedCity &&
      selectedLanguages.length > 0 &&
      emailError === "" &&
      confirmPasswordError === "" 
    );
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isFormValid()) {
         Toast.fire({
           icon: "warning",
           text: "Please fill input fields.",
         });
      return
    }
    setIsLoading(true);
    const formData = {
      FullName: event.target.fullname.value,
      Email: event.target.email.value,
      Password: event.target.password.value,
      Country: selectedCountry ? selectedCountry.value : null,
      State: selectedState ? selectedState.value : null,
      City: selectedCity ? selectedCity.value : null,
      Languages: selectedLanguages.map((language) => language.value),
      IsActive: event.target.active.checked,
    };

    try {
      await createUser(formData);
      onAddClick();
      event.target.reset();
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageChange = (selectedOptions) => {
    setSelectedLanguages(selectedOptions);
  };

  const handleConfirmPasswordChange = (event) => {
    const confirmPassword = event.target.value;
    if (confirmPassword === password) {
      setConfirmPassword(confirmPassword);
      setConfirmPasswordError("");
    } else {
      setConfirmPassword("");
      setConfirmPasswordError("Passwords do not matching.");
    }
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
        <div className="close-modal">
          <box-icon
            name="x-circle"
            color="#ffffff"
            style={{ width: "50px", height: "50px" }}
            onClick={onAddClick}
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
                          Create a new user
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
                              />
                            </p>
                            <p>
                              <label>Email</label>
                              <input
                                type="email"
                                placeholder="Email"
                                name="email"
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
                                placeholder="Password"
                                name="password"
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
                            <p className="password-strength-text">
                              Password Strength:{" "}
                              {getPasswordStrengthLabel(passwordStrength.score)}
                            </p>

                            <p>
                              <label>Confirm Password</label>
                              <input
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmpassword"
                                onChange={handleConfirmPasswordChange}
                                disabled={!password}
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
                                isDisabled={!selectedCountry}
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
                                isDisabled={!selectedState}
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
                                onClick={onAddClick}
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
                                Create
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

export default Create;
