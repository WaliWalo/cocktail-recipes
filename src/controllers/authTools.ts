const jwt = require("jsonwebtoken");
import { IUser } from "./../models/UserModel";

const authenticate = async (user: IUser) => {
  try {
    const newAccessToken = await generateJWT({ _id: user._id });

    await user.save();

    return { token: newAccessToken };
  } catch (error) {
    throw new Error(error);
  }
};

const generateJWT = (payload: object) =>
  new Promise((res, rej) =>
    jwt.sign(
      payload,
      process.env.REACT_APP_JWT_SECRET,
      { expiresIn: "15m" },
      (err: object, token: string) => {
        if (err) rej(err);
        res(token);
      }
    )
  );

const verifyJWT = (token: string) =>
  new Promise((res, rej) =>
    jwt.verify(
      token,
      process.env.REACT_APP_JWT_SECRET,
      (err: object, decoded: string) => {
        if (err) {
          console.log(err);
          rej(err);
        }
        res(decoded);
      }
    )
  );

module.exports = { authenticate, verifyJWT };
