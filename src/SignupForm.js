import React, { Component } from "react";

class SignupForm extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    petName: "",
    petWeight: 0,
    petIdealWeight: 0,
  };

  handleInputUpdate = (e) => {
    this.setState({ [e.target.name]: e.target.value });
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
    console.log(newUser);
    this.setState({
      id: "",
      email: "",
      password: "",
      petName: "",
      petWeight: 0,
      petIdealWeight: 0,
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
