const express = require("express");
const webPush = require("web-push");
const path = require("path");
const app = express();
const axios = require("axios");
app.use(express.json());
let CronJob = require("cron").CronJob;
const publicvapidkey =
  "BJSWZuhk5KSXEycvEUzlSAZpgH_QBiV1cf89f3uhz_KQBPXALTQS6EKGX5TaBR63btaNDQFxHmUGEpoyduYItg4";
const privatevapidkey = "hsUMsI6CudxtDRggihSQXgEApn_4EpEgE_n1Q_A0WF4";

webPush.setVapidDetails(
  "mailto:debaosuidecl@gmail.com",
  publicvapidkey,
  privatevapidkey
);

//set static path

app.use(express.static(path.join(__dirname, "client")));
async function sendPushNotification() {
  const response = await axios.get("https://blockchain.info/ticker");
  //   console.log();
  const bitcoinPrice = response.data.USD["15m"];
  // get push subscription object
  const subscription = {
    endpoint:
      "https://fcm.googleapis.com/fcm/send/dP0oLYTj-yM:APA91bGiIEzGSAufmT9S7mNto9BccDxAQbJe-RAuRgUInY2leJ_noRCUvtQ4hIn8NigOgtS-_lw963LUrbZtlRLi6lfcT319Fz9Pst5ALmc4YGQgGP1rR2wJozQLs5PNaNATHiIq2cTN",
    expirationTime: null,
    keys: {
      p256dh:
        "BKd4ZPdomEdU5LYd4EQObZnxilIXiofJ8Sa-hQ9WynQm3As3o9KthobhobCkiFUt0gY93nXwezVPOxLq889WQMI",
      auth: "9cxseEy8ecH_4W1QNpYpAQ",
    },
  };
  console.log(subscription);
  // res.status(201).json({});

  //create a payload

  const payload = JSON.stringify({
    title: `1BTC = $${bitcoinPrice.toLocaleString()}`,
    advice:
      bitcoinPrice < 10500
        ? "You may want to withraw right now. click to go to your wallet"
        : "Keep your money it could still grow",
  });

  console.log(payload);
  // pass object into the send notification function

  webPush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
}

// // create subscribe route

// app.post("/api/subscribe", (req, res) => {});

let job = new CronJob(
  "0 */1 * * * *",
  sendPushNotification,
  null,
  true,
  "America/Los_Angeles"
);
job.start();
(async () => {})();

const PORT = process.env.PORT || 2001;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
