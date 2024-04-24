import { Review } from "../../entity/review";

export async function getAllUserForReview() {
  return await Review.find({ relations: ["assignedUser", "reviewedBy"] });
}

export async function addReview(reviewData: any) {
  try {
    const review: any = Review.create({
      feedback: reviewData?.feedback,
      assignedUser: reviewData?.userId,
      reviewedBy: reviewData?.reviewedBy,
    });
    return Review.save(review);
  } catch (err) {
    return err;
  }
}

export async function updateReview(_id: string, updatedReviewData: any) {
  try {
    return await Review.update(_id, {
      feedback: updatedReviewData.feedback,
      reviewedBy: updatedReviewData.reviewedBy,
      assignedUser: updatedReviewData.assignedUser,
    });
  } catch (err) {
    return err;
  }
}

export const deleteReviewById = async (_id: number | string) => {
  try {
    return await Review.delete(_id);
  } catch (err) {
    return err;
  }
};

export async function getReviewByUserId(
  assignedUser: string,
  reviewedBy: string
) {
  const reviewedUser = await Review.findOne({
    where: { assignedUser: assignedUser, reviewedBy: reviewedBy },
    relations: ["assignedUser", "reviewedBy"],
  });
  return reviewedUser
}

export async function assignUserForReview(_id: any, assigned: any) {
  try {
    assigned.assigned.map(async (userId) => {
      const reviewUser = await Review.findOne({where:{assignedUser: userId,reviewedBy:_id}})
      if(!reviewUser){
        const review: any = Review.create({
          feedback: "",
          assignedUser: userId,
          reviewedBy: _id,
        });
        return Review.save(review);
      }

    });
  } catch (err) {
    return err;
  }
}
