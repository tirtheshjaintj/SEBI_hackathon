const Expo = require('expo-server-sdk');
let expo = new Expo();

const sendBatchNotification = async ({ pushTokens, payload }) => {
  let messages = [];

  for (let pushToken of pushTokens) {

    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    messages.push({
      to: pushToken,
      sound: 'default',
      // body: 'This is a test notification',
      // data: { withSome: 'data' },
      ...payload
    })
  }


  let chunks = expo.chunkPushNotifications(messages);

  (async () => {
    // Send the chunks to the Expo push notification service. There are
    // different strategies you could use. A simple one is to send one chunk at a
    // time, which nicely spreads the load out over time:
    for (let chunk of chunks) {
      try {
        let receipts = await expo.sendPushNotificationsAsync(chunk);
        console.log(receipts);
      } catch (error) {
        console.error(error);
      }
    }
  })();
}


module.exports = { sendBatchNotification }