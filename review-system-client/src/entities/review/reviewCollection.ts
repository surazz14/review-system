import { types, flow } from "mobx-state-tree";
import generalAction from "../generalActions";
import Review from "./review";
import Store from "../setUpStore";
const collection = types
  .model("Review", {
    reviews: types.optional(types.array(Review), []),
  })
  .actions(generalAction)
  .actions((self) => ({
    getAllReview: flow(function* () {
      const userId: string = Store.user._id;
      try {
        const response = yield self.getRequest(`/user/review/${userId}`)();
        self.reviews = response.reviews;
        return response;
      } catch (e) {
        throw e;
      }
    }),

    editFeedback: flow(function* (_id: string, feedback: string, member: any) {
      const currentMember = self.reviews.find((data: any) => data._id === _id);
      try {
        const payload: any = {
          assignedUser: currentMember?.assignedUser?._id,
          feedback: feedback,
          reviewedBy: currentMember?.reviewedBy?._id,
        };
        const response = yield self.putRequest(`/user/review/${_id}`)(payload);
        return response;
      } catch (e) {
        throw e;
      }
    }),

    deleteMember: flow(function* (_id: any) {
      try {
        const response = yield self.deleteRequest(`/user/${_id}`)();
        return response;
      } catch (e) {
        throw e;
      }
    }),
  }))
  
  .views((self) => ({

    get normalizedReview() {
      return self.reviews.map((review) => ({
        _id: review._id,
        feedback: review.feedback,
        name: review.assignedUser?.name,
        email: review.assignedUser?.email,
        address: review.assignedUser?.address,
        position: review.assignedUser?.position,
        reviewedBy: review.reviewedBy?.email
      }));
    },

    getReviewById(_id: string) {
      self.reviews.find((reviewId: any) => reviewId === _id);
    },
  }));

export default collection;
