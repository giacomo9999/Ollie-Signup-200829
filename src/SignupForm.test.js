import React from "react";
import { shallow, mount } from "enzyme";

import SignupForm from "./SignupForm";

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
