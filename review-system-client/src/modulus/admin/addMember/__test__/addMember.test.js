import React from "react";
import Button from "@material-ui/core/Button";
import { mount } from "enzyme";

import AddMember from "../index";

const props = {
  currentMember: {},
  mode:'add',
  handlers: {
    addMember: jest.fn(),
    editMember: jest.fn(),
    callback: jest.fn(),
    handleClose: jest.fn(),
  },
};

describe("AddMember", () => {
  it("on click add Member mode add", () => {
    const wrapper = mount(<AddMember {...props}  />);
    const addButton = wrapper.find(Button);
    addButton.simulate('click');
    expect(props.handlers.addMember).toBeCalled()
  });
});
