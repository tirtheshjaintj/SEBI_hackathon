const cron = require("node-cron");
const { sendScheduledNotifications } = require("./notifications");
const scheduleDailyDictionary = () => {
  //every day at 9:00 AM IST
  cron.schedule("30 3 * * *", async () => {
    console.log("Sending daily dictionary notification at 9:00 AM IST...");
    await sendScheduledNotifications();
  });
};
module.exports = { scheduleDailyDictionary };
