const Streak = require("../models/Streak");
const User = require("../models/User.js");

const updateStreak = async (req, res) => {
  try {
    // console.log("updateStreak",req.user);
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let streak = await Streak.findOne({ uid: userId });
    const now = new Date();
    let streakUpdated = false;

    if (!streak) {
      streak = new Streak({
        uid: userId,
        count: 1,
        updatedAt: now,
      });
      streakUpdated = true;
    } else {
      const lastUpdated = new Date(streak.updatedAt);
      const hoursDiff = Math.floor((now - lastUpdated) / (1000 * 60 * 60));

      if (hoursDiff >= 24 && hoursDiff < 48) {
        streak.count += 1;
        streak.updatedAt = now;
        streakUpdated = true;
      } else if (hoursDiff >= 48) {
        streak.count = 1;
        streak.updatedAt = now;
        streakUpdated = true;
      }
    }

    await streak.save();

    res.status(200).json({
      message: streakUpdated
        ? "Streak updated successfully"
        : "Streak already updated within 24 hours",
      count: streak.count,
      streakUpdated,
    });
  } catch (error) {
    console.error("Streak update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { updateStreak };
