import React, { Component } from "react";

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
    return true;
  };

  validatePetName = (petNameIn) => {
    return true;
  };

  validateWeight = (weightIn) => {
    return true;
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
    // If (checkedUser.allFieldsValid), make POST request to server
    console.log(checkedUser);
    this.setState(checkedUser.data);
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
      <div className="grid-container">
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
              type="text"
              name="password"
              value={this.state.password}
              onChange={this.handleInputUpdate}
            />
            <h4 className="validation-error">{invalidPasswordMsg}</h4>
            <label className="h-label">Confirm Password</label>
            <input
              className="h-input"
              type="text"
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
