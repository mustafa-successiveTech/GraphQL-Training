import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["Admin", "User", "Visitor"],
    default: "Visitor",
  },
});

export const User = mongoose.model("User", UserSchema);
