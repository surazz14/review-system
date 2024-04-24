import { types, flow } from "mobx-state-tree";
import generalAction from "../generalActions";
import Member from "./member";
import Store from "../setUpStore";

const collection = types
  .model("members", {
    members: types.optional(types.array(Member), []),
  })
  .actions(generalAction)
  .actions((self) => ({
    getAllMember: flow(function* () {
      try {
        const response = yield self.getRequest("/user")();
        self.members = response.users;
        return response;
      } catch (e) {
        throw e;
      }
    }),

    addMember: flow(function* (member: any) {
      try {
        const response = yield self.postRequest("/user")(member);
        self.members = response.users;
        return response;
      } catch (e) {
        throw e;
      }
    }),

    assignMember: flow(function* (currentMember: any, selectedMembers: any) {
      try {
        const payload = {
          assigned: selectedMembers.map((member: any) => member._id),
        };
        const response = yield self.putRequest(
          `/user/assign/${currentMember._id}`
        )(payload);
        self.members = response.users;
        return response;
      } catch (e) {
        throw e;
      }
    }),

    editMember: flow(function* (member: any, _id: any) {
      try {
        const response = yield self.putRequest(`/user/${_id}`)(member);
        self.members = response.users;
        return response;
      } catch (e) {
        throw e;
      }
    }),

    deleteMember: flow(function* (_id: any) {
      try {
        const response = yield self.deleteRequest(`/user/${_id}`)();
        self.members = response.users;
        return response;
      } catch (e) {
        throw e;
      }
    }),
  }))

  .views((self) => ({
    normalizedAssignedUser(memberIds: any) {
      const members: any = [];
      memberIds.forEach((_id: string) => {
        const member = self.members.find((member) => member._id === _id);
        if (member) {
          members.push(member);
        }
      });
      return members;
    },

    get membersExceptMe() {
      return self.members.filter((member) => member._id !== Store.user._id);
    },

    membersExcept(_id: string, members: any) {
      return members.filter((member: any) => member._id !== _id);
    },
  }));

export default collection;
