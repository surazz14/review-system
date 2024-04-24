import React from "react";
import Button from "@material-ui/core/Button";
import { mount } from "enzyme";

import AddFeedback from "../index";

const props = {
  currentMember: {},
  handlers: {
    editFeedback: jest.fn(),
    callback: jest.fn(),
    handleClose: jest.fn(),
  },
};

describe("AddFeedback", () => {
  it("on click add feedback", () => {
    const wrapper = mount(<AddFeedback {...props} />);
    const addButton = wrapper.find(Button);
    addButton.simulate("click");
    expect(props.handlers.editFeedback).toBeCalled();
  });
});
