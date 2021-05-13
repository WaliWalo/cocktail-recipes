const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
// const mongoose = require("mongoose");
// const UserSchema = require("../models/userModel");
// const UserModel = mongoose.model("User", UserSchema);
const { authenticate } = require("./authTools");
import { NextFunction, Request } from "express";
import { IUser, User } from "./../models/UserModel";
import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});
interface Profile {
  provider: String;
  id: String;
  displayName: String;
  name: name;
  emails: Array<email>;
  photos: Array<photo>;
}
type name = {
  familyName: String;
  givenName: String;
  middleName: String;
};
type email = {
  value: String;
  type: String;
};
type photo = {
  value: String;
};

interface ProfileFB {
  provider: String;
  id: String;
  displayName: String;
  name: name;
  email: String;
  photos: Array<photo>;
}

export interface ICustomUser {
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  favs: [string];
  googleId?: String;
  facebookId?: String;
  token?: string;
}

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.REACT_APP_GOOGLE_ID,
      clientSecret: process.env.REACT_APP_GOOGLE_SECRET,
      callbackURL: process.env.REACT_APP_CALLBACK_URL,
    },
    async (
      request: Request,
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      next: (err: object | null, user: IUser | null) => void
    ) => {
      const newUser = {
        googleId: profile.id,
        firstName: profile.name.givenName,
        username: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
        password: "NA",
      };
      try {
        const user = await User.findOne({ googleId: profile.id });

        if (user) {
          const { token } = await authenticate(user);
          next(null, user);
        } else {
          const createdUser = new User(newUser);
          await createdUser.save();
          const token = await authenticate(createdUser);

          next(null, createdUser);
        }
      } catch (error) {
        next(error, null);
      }
    }
  )
);

passport.use(
  "facebook",
  new FacebookStrategy(
    {
      clientID: process.env.REACT_APP_FACEBOOK_API_KEY,
      clientSecret: process.env.REACT_APP_FACEBOOK_SECRET,
      callbackURL: process.env.REACT_APP_FACEBOOK_CALLBACK,
      profileFields: ["id", "displayName", "photos", "email", "name"],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: ProfileFB,
      next: (err: object | null, user: IUser | null) => void
    ) => {
      const newUser = {
        facebookId: profile.id,
        firstName: profile.name.givenName,
        username: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.email !== undefined ? profile.email : "noemail@test.com",
        password: "NA",
      };
      try {
        const user = await User.findOne({ facebookId: profile.id });

        if (user) {
          const { token } = await authenticate(user);
          next(null, user);
        } else {
          const createdUser = new User(newUser);
          await createdUser.save();
          const token = await authenticate(createdUser);

          next(null, createdUser);
        }
      } catch (error) {
        console.log("error", error);
        next(error, null);
      }
    }
  )
);

passport.serializeUser(function (
  user: IUser,
  next: (err: object | null, userObject: IUser) => void
) {
  next(null, user);
});
