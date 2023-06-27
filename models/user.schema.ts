import { IUser } from "@/interfaces/IUser.interface";
import { Schema, model, models } from "mongoose";

const UserSchema = new Schema<IUser.IUserDetail>({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    lowercase: true,
  },
  image: {
    type: String,
  },
});

const User = models.User || model<IUser.IUserDetail>("User", UserSchema);

export default User;
