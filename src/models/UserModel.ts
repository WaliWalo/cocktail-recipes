import { model, Schema, Model, Document } from "mongoose";
const bcrypt = require("bcryptjs");

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  favs: Array<string>;
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: "Email address is required",
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    favs: [{ type: String }],
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, user) {
        delete user.password;
        delete user.__v;
      },
    },
  }
);

UserSchema.pre<IUser>("save", async function (next) {
  const user = this;
  const plainPW = user.password;
  console.log(user);
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(plainPW, 10);
  }
  next();
});

export const User: Model<IUser> = model("User", UserSchema);
