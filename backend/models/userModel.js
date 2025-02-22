import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetOtp: { type: String, default: "" },
  resetOtpExpireAt: { type: Number, default: 0 }
});

const userModel = mongoose.models.user || new mongoose.model("user", UserSchema);

export default userModel;
