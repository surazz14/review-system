import { types, flow } from "mobx-state-tree";
import generalAction from "../generalActions";
import apphistory from "apphistory";

export enum roleType {
  admin = "admin",
  member = "member",
}

const User = types
  .model("user", {
    _id: types.string,
    name: types.string,
    email: types.string,
    address: types.string,
    position: types.string,
    token: types.string,
    role: types.string,
  })
  .actions(generalAction)
  .actions((self) => ({

    login: flow(function* (loginData: { email: string; password: string }) {
      try {
        const user: any = yield self.postRequest("/user/login")(loginData);
        self._id = user._id;
        self.email = user.email;
        self.address = user.address;
        self.position = user.position;
        self.token = user.token;
        self.role = user.role;
        apphistory.push("/review");
        return user;
      } catch (e) {
        throw e;
      }
    }),

    logout: () => {
      self.token = "";
      apphistory.push("/");
    },
  }))

export default User;
