import ErrorHandler from "./../models/ErrorHandler";
import { IUser, User } from "./../models/UserModel";
class userController {
  defaultMethod() {
    throw new ErrorHandler(501, "Not implemented method");
  }

  getUsersMethod() {
    return "GET USERS";
  }

  getUsersByIdMethod(id: string) {
    return "GET USERS BY ID";
  }

  async postNewUser(userData: IUser) {
    try {
      const user: IUser = await User.create(userData);
      return user;
    } catch (error) {
      return error;
    }
  }

  updateUser(id: string) {
    return "UPDATE USER";
  }

  deleteUser(id: string) {
    return "DELETE USER";
  }
}

export = new userController();
