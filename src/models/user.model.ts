import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a name!"]
  },
  email: {
    type: String,
    required: [true, "Please provide a valid email!"],
    unique: [true],
  },
  password: {
    type: String,
    required: [true, "Please provide a password."]
  }
});
const UserModel = mongoose.model("User", UserSchema)
export default UserModel


