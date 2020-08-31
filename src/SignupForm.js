import React, { Component } from "react";

class SignupForm extends Component {
  state = {
    email: "",
    emailIsValid: true,
    password: "",
    confirmPassword: "",
    passwordIsValid: true,
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
    let atpos = emailIn.indexOf("@");
    let dotpos = emailIn.lastIndexOf(".");
    if (atpos < 1 || dotpos - atpos < 2) {
      return false;
    }
    return true;
  };

  validatePassword = (passwordIn, confPasswordIn) => {};

  validatePetName = (petNameIn) => {};

  validateWeight = (weightIn) => {};

  // Validate user information
  validateUser = (userIn) => {
    const userOut = {
      email: userIn.email,
      emailIsValid: this.validateEMail(userIn.email),
      password: userIn.password,
      confirmPassword: userIn.confirmPassword,
      passwordIsValid: this.validatePassword(
        userIn.password,
        userIn.confirmPassword
      ),
      petName: userIn.petName,
      petNameIsValid: this.validatepetName(userIn.petName),
      petWeight: userIn.petWeight,
      petWeightIsValid: this.validateWeight(userIn.petWeight),
      petIdealWeight: userIn.petIdealWeight,
      petIdealWeightIsValid: this.validateWeight(userIn.petIdealWeight),
    };
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

    console.log("User validated...", this.validateUser(newUser));
    // If all fields are valid, make POST request to server
    console.log(newUser);

    this.setState({
      email: "",
      emailIsValid: true,
      password: "",
      confirmPassword: "",
      passwordIsValid: true,
      petName: "",
      petNameIsValid: true,
      petWeight: 0,
      petWeightIsValid: true,
      petIdealWeight: 0,
      petIdealWeightIsValid: true,
    });
  };

  render() {
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
            <h4 className="validation-error">Invalid e-mail address</h4>
            <label className="h-label">Password</label>
            <input
              className="h-input"
              type="text"
              name="password"
              value={this.state.password}
              onChange={this.handleInputUpdate}
            />
            <label className="h-label">Confirm Password</label>
            <input
              className="h-input"
              type="text"
              name="confirmPassword"
              value={this.state.confirmPassword}
              onChange={this.handleInputUpdate}
            />
            <label className="h-label">Pet Name</label>
            <input
              className="h-input"
              type="text"
              name="petName"
              value={this.state.petName}
              onChange={this.handleInputUpdate}
            />
            <label className="h-label">Pet Weight</label>
            <input
              className="h-input"
              type="text"
              name="petWeight"
              value={this.state.petWeight}
              onChange={this.handleInputUpdate}
            />
            <label className="h-label">Pet Ideal Weight</label>
            <input
              className="h-input"
              type="text"
              name="petIdealWeight"
              value={this.state.petIdealWeight}
              onChange={this.handleInputUpdate}
            />

            <br />
            <button className="h-btn">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignupForm;
