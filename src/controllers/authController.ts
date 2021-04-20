import { Query } from "mongoose";
import ErrorHandler from "./../models/ErrorHandler";
import { User } from "./../models/UserModel";
const bcrypt = require("bcryptjs");

interface ICredentials {
  email: string;
  password: string;
}

class authController {
  defaultMethod() {
    throw new ErrorHandler(501, "Not implemented method");
  }

  async findByCredentials(email: string, password: string) {
    const user = await User.findOne({ email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) return user;
      else return null;
    } else {
      return null;
    }
  }

  async login(credentials: ICredentials) {
    try {
      const user = await this.findByCredentials(
        credentials.email,
        credentials.password
      );

      if (user === null) {
        return null;
      } else {
        return user;
      }
    } catch (error) {
      return error;
    }
  }
}

export = new authController();
