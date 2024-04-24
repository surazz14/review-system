import Member from "modulus/admin/member";
import Review from "modulus/review";
import Login from "modulus/login";
import Test from "modulus/test"

export default [
  {
    component: Member,
    path: "/member",
    exact: true,
    is_private: true,
  },
  {
    component: Review,
    path: "/review",
    exact: true,
    is_private: true
  },
  {
    component: Login,
    path: "/",
    exact: true,
    is_private: false

  },
  {
    component: Test,
    path: "/test",
    exact: true,
    is_private: false

  },
];
