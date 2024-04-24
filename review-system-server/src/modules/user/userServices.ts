import { User, UserRole } from "../../entity/user";

export interface UserInfo {
  name?: string;
  address?: string;
  email?: string;
  position?: string;
  password?: string;
  role: UserRole;
}

export async function createUser(data: UserInfo) {
  let user = User.create({
    ...data,
  });

  return User.save(user);
}

export async function getUserByEmail(email: string) {
  return await User.findOne({ email });
}

export async function getUserById(_id: any) {
  return await User.findOne({ _id });
}

export async function getAllUser() {
  return await User.find();
}

export async function updateUser(_id: string, updatedData) {
  try {
    return await User.update(_id, { ...updatedData });
  } catch (err) {
    return err;
  }
}

export const deleteUserById = async (_id: number | string) => {
  try {
    return await User.delete(_id);
  } catch (err) {
    return err;
  }
};

export async function assignUserForReview(_id: string, assigned: any) {
  try {
    let user: any = User.findOne(_id);
    user.assigned = assigned.assigned;
    return User.update(_id, { ...user });
  } catch (err) {
    return err;
  }
}
