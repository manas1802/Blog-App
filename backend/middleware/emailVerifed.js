import userModel from "../models/userModel.js";

export const emailVerified = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    if (!user.isAccountVerified) {
      return res.json({ success: false, message: "Account is not verfied" });
    }

    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
