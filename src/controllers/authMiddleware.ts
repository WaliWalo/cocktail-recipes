import { NextFunction, Request, Response } from "express";
import { User } from "./../models/UserModel";
import ErrorHandler from "./../models/ErrorHandler";
const jwt = require("jsonwebtoken");
const { verifyJWT } = require("./authTools");
const authorize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.accessToken;
    const decoded = await verifyJWT(token);
    const user = await User.findById({
      _id: decoded._id,
    });
    if (!user) {
      const error = new ErrorHandler(401, "Please authenticate");
      next(error);
    }

    // req.token = token;
    // req.user = user;
    next();
  } catch (e) {
    console.log(e);
    const error = new ErrorHandler(401, "Please authenticate");
    next(error);
  }
};

module.exports = { authorize };
