const { sendBatchNotification } = require("../services/notifications");
const User = require("../models/User");
const savePushToken = async (req, res) => {
  try {
    const userId = req.user._id;
    const { pushToken } = req.body;
    if (!pushToken)
      return res.status(400).json({ message: "Push token is required" });
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.pushToken = pushToken;
    await user.save();

    res.status(200).json({ message: "Push token saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const sendScheduledNotifications = async () => {
  try {
    const users = await User.find({ pushToken: { $exists: true } });
    const pushTokens = users.map((u) => u.pushToken);

    // has to fetch the random work of the day from the dictionary
    const payload = {
      title: "Word of the Day: Serendipity",
      body: "Tap to view details",
      data: {
        screen: "dictionary", 
        params: {
          wordId: "64aa123abcde", // or yha par word he use hojayga.
        },
      },
    };
    await sendBatchNotification({ pushTokens, payload });
  } catch (error) {
    console.error("Error sending scheduled notifications:", error);
  }
};
module.exports = { savePushToken, sendScheduledNotifications };
