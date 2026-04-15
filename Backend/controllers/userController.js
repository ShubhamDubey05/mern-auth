import User from "../models/userModel.js";

export const userData = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};