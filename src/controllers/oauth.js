"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import dotenv from "dotenv";
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const { authenticate } = require("./authTools");
const UserModel_1 = require("./../models/UserModel");
passport.use("google", new GoogleStrategy({
    clientID: process.env.REACT_APP_GOOGLE_ID,
    clientSecret: process.env.REACT_APP_GOOGLE_SECRET,
    callbackURL: process.env.REACT_APP_CALLBACK_URL,
}, async (request, accessToken, refreshToken, profile, next) => {
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
        const user = await UserModel_1.User.findOne({ googleId: profile.id });
        if (user) {
            const { token } = await authenticate(user);
            next(null, user);
        }
        else {
            const createdUser = new UserModel_1.User(newUser);
            await createdUser.save();
            const token = await authenticate(createdUser);
            next(null, createdUser);
        }
    }
    catch (error) {
        next(error, null);
    }
}));
passport.use("facebook", new FacebookStrategy({
    clientID: process.env.REACT_APP_FACEBOOK_API_KEY,
    clientSecret: process.env.REACT_APP_FACEBOOK_SECRET,
    callbackURL: process.env.REACT_APP_FACEBOOK_CALLBACK,
    profileFields: ["id", "displayName", "photos", "email", "name"],
}, async (accessToken, refreshToken, profile, next) => {
    const newUser = {
        facebookId: profile.id,
        firstName: profile.name.givenName,
        username: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.email !== undefined ? profile.email : "noemail@test.com",
        password: "NA",
    };
    try {
        const user = await UserModel_1.User.findOne({ facebookId: profile.id });
        if (user) {
            const { token } = await authenticate(user);
            next(null, user);
        }
        else {
            const createdUser = new UserModel_1.User(newUser);
            await createdUser.save();
            const token = await authenticate(createdUser);
            next(null, createdUser);
        }
    }
    catch (error) {
        console.log("error", error);
        next(error, null);
    }
}));
passport.serializeUser(function (user, next) {
    next(null, user);
});
