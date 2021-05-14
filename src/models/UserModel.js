"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: "Email address is required",
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
        unique: true,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    favs: [{ type: String }],
    googleId: String,
    facebookId: String,
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, user) {
            delete user.password;
            delete user.__v;
        },
    },
});
UserSchema.pre("save", async function (next) {
    const user = this;
    const plainPW = user.password;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(plainPW, 10);
    }
    next();
});
exports.User = mongoose_1.model("User", UserSchema);
