import React from "react";
import { shallow, mount } from "enzyme";

import SignupForm from "./SignupForm";

const validUserData = {
  email: "johndoe@doemainname.com",
  emailIsValid: true,
  password: "1234abcd$",
  passwordIsValid: true,
  confirmPassword: "1234abcd$",
  passwordsMatch: true,
  petName: "Fido",
  petNameIsValid: true,
  petWeight: 50,
  petWeightIsValid: true,
  petIdealWeight: 40,
  petIdealWeightIsValid: true,
};

const invalidUserData = {
  email: "johndoe",
  emailIsValid: true,
  password: "1234abcd$",
  passwordIsValid: true,
  confirmPassword: "1234abcd$",
  passwordsMatch: true,
  petName: "Fido",
  petNameIsValid: true,
  petWeight: 50,
  petWeightIsValid: true,
  petIdealWeight: 40,
  petIdealWeightIsValid: true,
};

const setup = (state = null) => {
  const wrapper = shallow(<SignupForm />);
  if (state) {
    wrapper.setState(state);
  }
  return wrapper;
};

test("Renders without error", () => {
  const appComponent = setup().find("[data-test='component-signup-form']");
  expect(appComponent.length).toBe(1);
});

test("Captures e-mail correctly onChange", () => {
  const component = mount(<SignupForm />);
  const input = component.find("input").at(0);
  input.instance().value = "foo@bar.com";
  input.simulate("change");
  expect(component.state().email).toEqual("foo@bar.com");
});

test("Component state resets to initial (blank) state on submission of validated user data", () => {
  const component = mount(<SignupForm />);
  component.setState(validUserData);
  component.find("form").simulate("submit");
  expect(component.state().email).toEqual("");
  expect(component.state().password).toEqual("");
  expect(component.state().petName).toEqual("");
  expect(component.state().petWeight).toEqual(0);
  expect(component.state().petIdealWeight).toEqual(0);
});

test("Displays error message message on submission of invalid user e-mail", () => {
  const component = mount(<SignupForm />);
  component.setState(invalidUserData);
  component.find("form").simulate("submit");
  const validationErrorMsg = component.find("[data-test='invalid-email']");
  expect(validationErrorMsg.text()).toEqual(
    "E-mail must be of the form xxx@xxxx.xxx"
  );
});
