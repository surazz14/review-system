import { types } from "mobx-state-tree";
import generalAction from "../generalActions";
import Member from "../member/member";

const Review = types
  .model("review", {
    _id: types.string,
    assignedUser: types.frozen(Member),
    feedback: types.string,
    reviewedBy: types.frozen(Member),
  })
  .actions(generalAction)

export default Review;
