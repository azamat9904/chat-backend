import { Schema, model, Document } from "mongoose";
import isEmail from "validator/lib/isEmail";

export interface IUser extends Document {
  email: string;
  avatar?: string;
  fullname: string;
  password: string;
  confirmed: boolean;
  confirm_hash?: string;
  last_seen?: String;
}

const UserScheme = new Schema(
  {
    email: {
      type: String,
      required: "Email is required",
      validate: [isEmail, "Invalid email"],
      unique: true,
    },
    avatar: String,
    fullname: {
      type: String,
      required: "Fullname is required",
    },
    password: {
      type: String,
      required: "Password is required",
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    confirm_hash: String,
    last_seen: {
      type: String,
      required: false
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>("User", UserScheme);

export default User;
