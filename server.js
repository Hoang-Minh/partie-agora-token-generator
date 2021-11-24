const express = require("express");
const cors = require("cors");

const { RtcTokenBuilder, RtcRole } = require("agora-access-token");
const app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// routes
app.get("/api/agora/rtcToken/:tokenType", cors(), (req, res) => {
  const currentTimeStamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs =
    currentTimeStamp + Number(process.env.EXPIRATION_TIME_IN_SECONDS);

  const { channelName, user } = req.query;

  if (!channelName) {
    return res.status(400).json({ error: "Channel name is required" }).send();
  }

  const tokenType = req.params.tokenType;

  if (!tokenType) {
    return res.status(400).json({ error: "token type is required" }).send();
  }

  if (tokenType === "uid") {
    const key = RtcTokenBuilder.buildTokenWithUid(
      process.env.API_ID,
      process.env.API_CERTIFICATE,
      channelName,
      Number(user),
      RtcRole.PUBLISHER,
      privilegeExpiredTs
    );
    return res
      .json({ key, expireInSeconds: process.env.EXPIRATION_TIME_IN_SECONDS })
      .send();
  } else if (tokenType === "account") {
    const key = RtcTokenBuilder.buildTokenWithAccount(
      process.env.API_ID,
      process.env.API_CERTIFICATE,
      channelName,
      user,
      RtcRole.PUBLISHER,
      privilegeExpiredTs
    );
    return res
      .json({ key, expireInSeconds: process.env.EXPIRATION_TIME_IN_SECONDS })
      .send();
  } else {
    return res.status(400).json({ error: "Invalid token type" }).send();
  }
});

app.listen(process.env.PORT, () =>
  console.log(`server is up at port at ${process.env.PORT}`)
);
