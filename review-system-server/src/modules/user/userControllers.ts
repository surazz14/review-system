import { Request, Response, NextFunction } from "express";
import * as boom from "@hapi/boom";
import HttpStatus from "http-status-codes";

import * as userServices from "./userServices";
import * as userReviewService from "./userReviewServices";
import { createToken } from "../../utils/tokenGenerator";
import { UserRole } from "../../entity/user";
import { UserInfo } from "./userServices";

export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userServices.getUserByEmail(req.body.email);

    if (user) {
      throw boom.badRequest("Email Already Exist");
    }
    await userServices.createUser(req.body);
    const allUser = await userServices.getAllUser();
    res.status(HttpStatus.CREATED).json({
      message: "User added successfully",
      users: allUser,
    });
  } catch (err) {
    next(err);
  }
};

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (
      req.body.email === process.env.ADMIN_EMAIL &&
      req.body.password === process.env.ADMIN_PASSWORD
    ) {
      //Hack for creating admin
      const user = await userServices.getUserByEmail(req.body.email);
      if (!user) {
        const adminData: UserInfo = {
          name: "admin",
          address: "admin",
          email: "admin@admin.com",
          position: "admin",
          role: UserRole.ADMIN,
          password: "admin",
        };
        await userServices.createUser(adminData);
      }
    }
    let user = await userServices.getUserByEmail(req.body.email);
    if (!user) {
      throw boom.notFound("User doesn't exits");
    }

    if (req.body.password !== user.password) {
      throw boom.unauthorized("Password is incorrect");
    }

    const token = createToken(user, process.env.SECRET);
    return res.status(HttpStatus.OK).json({
      _id: user._id,
      email: user.email,
      token: token,
      name: user.name,
      address: user.address,
      position: user.position,
      role: user.role,
      password: user.password,
    });
  } catch (err) {
    next(err);
  }
}

export async function getAllUser(req, res, next) {
  try {
    const users = await userServices.getAllUser();

    return res.status(HttpStatus.OK).json({
      users,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateUser(req, res, next) {
  try {
    await userServices.updateUser(req.params.id, req.body);
    const allUsers = await userServices.getAllUser();

    res.status(HttpStatus.OK).json({
      message: "User updated successfully",
      users: allUsers,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  try {
    await userServices.deleteUserById(req.params.id);
    const allUsers = await userServices.getAllUser();

    res.status(HttpStatus.OK).json({
      message: "User deleted successfully",
      users: allUsers,
    });
  } catch (err) {
    next(err);
  }
}

export async function getAssignedUserForReview(req, res, next) {
  try {
    const currentUser = await userServices.getUserById(req.params.id);
    if (currentUser.role === UserRole.ADMIN) {
      const allReview = await userReviewService.getAllUserForReview();
      return res.status(HttpStatus.OK).json({
        reviews: allReview,
      });
    } else {
      let assignedReviews = await currentUser?.assigned?.map(
        async (_id) =>
          await userReviewService.getReviewByUserId(_id, req.params.id)
      );

      Promise.all(assignedReviews).then((reviews) => {
        return res.status(HttpStatus.OK).json({
          reviews: reviews.filter((data) => data),
        });
      });
    }
  } catch (err) {
    next(err);
  }
}

export const addReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userReviewService.addReview(req.body);
    res.status(HttpStatus.CREATED).json({
      message: "User added successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const updateReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userReviewService.updateReview(req.params.id, req.body);
    res.status(HttpStatus.CREATED).json({
      message: "Review updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

export async function deleteReview(req, res, next) {
  try {
    await userReviewService.deleteReviewById(req.params.id);
    res.status(HttpStatus.OK).json({
      message: "Review deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}

export const assignUserForReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userServices.assignUserForReview(req.params.id, req.body);
    await userReviewService.assignUserForReview(req.params.id, req.body);

    const allUser = await userServices.getAllUser();
    res.status(HttpStatus.CREATED).json({
      message: "User added successfully",
      users: allUser,
    });
  } catch (err) {
    next(err);
  }
};
