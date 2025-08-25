
const User = require("../models/userModel");


const setTheme = async (req, res) => {
  try {
    const userId = req.user._id;
    const { theme } = req.body;

    const validThemes = ["light", "dark"];

    if (!validThemes.includes(theme)) {
      return res.status(400).json({ message: "Invalid theme value" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { themePreference: theme },
      { new: true } // return the updated document
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Theme updated successfully..", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get user's theme
const getTheme = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select("themePreference");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ theme: user.themePreference });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { setTheme, getTheme };
