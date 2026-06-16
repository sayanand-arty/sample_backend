import User from "../models/userModel.js";

export const signup = async (req, res) => {
  try {
    const { name, email, pass } = req.body;

    if (!name || !email || !pass) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      pass,
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      user,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { name, pass } = req.body;

    const user = await User.findOne({
      name,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Username not found",
      });
    }

    if (user.pass !== pass) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    return res.status(200).json({
  success: true,
  message: "Login successful",
  user,
});

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const task = (req, res) => {
    res.send("Hello task");
};