import MemberCollection from "./member/memberCollection";
import ReviewCollection from "./review/reviewCollection";
import User from "./user/user";

const store = {
  members: MemberCollection.create({}),
  reviews: ReviewCollection.create({}),
  user: User.create({
    _id: "",
    name: "",
    email: "",
    address: "",
    position: "",
    token: "",
    role: "",
  }),
};

window.app = store;

export default store;
