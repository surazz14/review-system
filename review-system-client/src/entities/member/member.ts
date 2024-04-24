import { types } from "mobx-state-tree";
import generalAction from "../generalActions";

const Member = types
  .model("member", {
    _id: types.string,
    name: types.string,
    email: types.string,
    address: types.string,
    position: types.string,
    password: types.string,
    assigned: types.frozen()
  })
  .actions(generalAction)

export default Member;
