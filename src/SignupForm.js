import React, { Component } from "react";
import axios from "axios";

class SignupForm extends Component {
  state = {
    email: "",
    emailIsValid: true,
    password: "",
    passwordIsValid: true,
    confirmPassword: "",
    passwordsMatch: true,
    petName: "",
    petNameIsValid: true,
    petWeight: 0,
    petWeightIsValid: true,
    petIdealWeight: 0,
    petIdealWeightIsValid: true,
  };

  handleInputUpdate = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Helper functions for validation
  validateEMail = (emailIn) => {
    let strongRegex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return strongRegex.test(emailIn);
  };

  validatePassword = (password) => {
    let strongRegex = new RegExp(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
    );
    return strongRegex.test(password);
  };

  validatePasswordMatch = (passwordIn, confPasswordIn) => {
    return passwordIn === confPasswordIn;
  };

  validatePetName = (petNameIn) => {
    let strongRegex = new RegExp(/^[a-zA-Z0-9_.-]*$/);
    return strongRegex.test(petNameIn);
  };

  validateWeight = (weightIn) => {
    return weightIn >= 3 && weightIn <= 180;
  };

  // Validate user information
  validateUser = (userIn) => {
    const userOut = {
      allFieldsValid: false,
      data: {
        email: userIn.email,
        emailIsValid: this.validateEMail(userIn.email),
        password: userIn.password,
        confirmPassword: userIn.confirmPassword,
        passwordIsValid: this.validatePassword(userIn.password),
        passwordsMatch: this.validatePasswordMatch(
          userIn.password,
          userIn.confirmPassword
        ),
        petName: userIn.petName,
        petNameIsValid: this.validatePetName(userIn.petName),
        petWeight: userIn.petWeight,
        petWeightIsValid: this.validateWeight(userIn.petWeight),
        petIdealWeight: userIn.petIdealWeight,
        petIdealWeightIsValid: this.validateWeight(userIn.petIdealWeight),
      },
    };
    if (
      userOut.data.emailIsValid &&
      userOut.data.passwordIsValid &&
      userOut.data.passwordsMatch &&
      userOut.data.petNameIsValid &&
      userOut.data.petWeightIsValid &&
      userOut.data.petIdealWeightIsValid
    ) {
      userOut.allFieldsValid = true;
    }
    return userOut;
  };

  addNewUser = (e) => {
    e.preventDefault();
    const newUser = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      petName: this.state.petName,
      petWeight: this.state.petWeight,
      petIdealWeight: this.state.petIdealWeight,
    };

    const checkedUser = this.validateUser(newUser);
    this.setState(checkedUser.data);
    // If (checkedUser.allFieldsValid), make POST request to server
    if (checkedUser.allFieldsValid) {
      this.setState({
        email: "",
        emailIsValid: true,
        password: "",
        passwordIsValid: true,
        confirmPassword: "",
        passwordsMatch: true,
        petName: "",
        petNameIsValid: true,
        petWeight: 0,
        petWeightIsValid: true,
        petIdealWeight: 0,
        petIdealWeightIsValid: true,
      });

      this.submitUserData(checkedUser);
    }
  };

  submitUserData = (userData) => {
    const dataObject = JSON.stringify({
      email: userData.data.email,
      password: userData.data.password,
      petName: userData.data.petName,
      petWeight: userData.data.petWeight,
      petIdealWeight: userData.data.petIdealWeight,
    });

    axios
      .post(
        "https://32f2jzoot4.execute-api.us-east-1.amazonaws.com/default/fe-takehome-api",
        dataObject,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        alert("User registered successfully.");
      })
      .catch((err) => {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          const alertMessage =
            err.response.data.message || "Unspecified server error";
          alert(alertMessage);
        } else if (err.request) {
          // client never received a response, or request never left
          alert("No response from server.");
        } else {
          // anything else
          alert("An error occurred. ");
        }
      });
  };

  render() {
    let invalidEmailMsg = this.state.emailIsValid
      ? ""
      : "E-mail must be of the form xxx@xxxx.xxx";
    let invalidPasswordMsg = this.state.passwordIsValid
      ? ""
      : "Password must contain min. 8 chars with 1 number, 1 letter, and 1 special character";
    let invalidNonMatchingPwdMsg = this.state.passwordsMatch
      ? ""
      : "Passwords do not match";
    let invalidPetNameMsg = this.state.petNameIsValid
      ? ""
      : "Letters and numbers only";
    let invalidPetWeightMsg = this.state.petWeightIsValid
      ? ""
      : "Weight must be between 3 and 180 lbs";
    let invalidIdealPetWeightMsg = this.state.petIdealWeightIsValid
      ? ""
      : "Weight must be between 3 and 180 lbs";

    return (
      <div className="grid-container" data-test="component-signup-form">
        <div className="grid-item">
          <img
            src="https://via.placeholder.com/600"
            alt="Grey box with dimensions"
          />
        </div>

        <div className="grid-item">
          <form className="h-form" onSubmit={this.addNewUser}>
            <label className="h-label">E-Mail</label>
            <input
              className="h-input"
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleInputUpdate}
            />
            <h4 className="validation-error">{invalidEmailMsg}</h4>
            <label className="h-label">Password</label>
            <input
              className="h-input"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputUpdate}
            />
            <h4 className="validation-error">{invalidPasswordMsg}</h4>
            <label className="h-label">Confirm Password</label>
            <input
              className="h-input"
              type="password"
              name="confirmPassword"
              value={this.state.confirmPassword}
              onChange={this.handleInputUpdate}
            />
            <h4 className="validation-error">{invalidNonMatchingPwdMsg}</h4>
            <label className="h-label">Pet Name</label>
            <input
              className="h-input"
              type="text"
              name="petName"
              value={this.state.petName}
              onChange={this.handleInputUpdate}
            />
            <h4 className="validation-error">{invalidPetNameMsg}</h4>
            <label className="h-label">Pet Weight</label>
            <input
              className="h-input"
              type="text"
              name="petWeight"
              value={this.state.petWeight}
              onChange={this.handleInputUpdate}
            />
            <h4 className="validation-error">{invalidPetWeightMsg}</h4>
            <label className="h-label">Pet Ideal Weight</label>
            <input
              className="h-input"
              type="text"
              name="petIdealWeight"
              value={this.state.petIdealWeight}
              onChange={this.handleInputUpdate}
            />
            <h4 className="validation-error">{invalidIdealPetWeightMsg}</h4>

            <br />
            <button className="h-btn">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignupForm;
