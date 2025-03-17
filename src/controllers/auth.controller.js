import { User } from "../models/user.model.js";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = new User({
      username,
      password,
      isMfaEnabled: false,
    });

    await user.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log("Error in registerController: ", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while registering user, please try again",
    });
  }
};
