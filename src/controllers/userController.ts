import { Query } from "mongoose";
import ErrorHandler from "./../models/ErrorHandler";
import { IUser, User } from "./../models/UserModel";

class userController {
  defaultMethod() {
    throw new ErrorHandler(501, "Not implemented method");
  }

  async getUsersMethod() {
    try {
      const users = await User.find({});
      if (users.length !== 0) {
        return users;
      } else {
        throw new ErrorHandler(404, "Users not found");
      }
    } catch (error) {
      return error;
    }
  }

  async getUsersByIdMethod(id: string) {
    try {
      const user: IUser | null = await User.findById(id);

      if (user) {
        return user;
      } else {
        throw new ErrorHandler(404, "User not found");
      }
    } catch (error) {
      if (error.value) {
        throw new ErrorHandler(404, "User not found");
      } else return error;
    }
  }

  async postNewUser(userData: IUser) {
    try {
      const user: IUser = await User.create(userData);

      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new ErrorHandler(404, "Email has already been used");
      } else return error;
    }
  }

  async updateUser(id: string, body: IUser) {
    try {
      const user: IUser | null = await User.findOneAndUpdate(
        { _id: id },
        body,
        { new: true, useFindAndModify: false }
      );
      if (user) {
        return user;
      } else {
        throw new ErrorHandler(404, "User not found");
      }
    } catch (error) {
      if (error.reason) {
        throw new ErrorHandler(404, "User not found");
      } else return error;
    }
  }

  async deleteUser(id: string) {
    try {
      const user: IUser | null = await User.findOneAndDelete({
        _id: id,
      });
      if (user) {
        return `${id} deleted`;
      } else {
        throw new ErrorHandler(404, "User not found");
      }
    } catch (error) {
      if (error.reason) {
        throw new ErrorHandler(404, "User not found");
      } else return error;
    }
  }
}

export = new userController();
