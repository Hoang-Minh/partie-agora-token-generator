const express = require("express");
const { port, app_id, app_certificate, expiration_time_in_seconds} = require("./config");
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');
const app = express();

// routes
app.get("/api/agora/rtcToken", (req, res) => {

    const currentTimeStamp = Math.floor(Date.now() / 1000);
    // token expire time, hardcode to 3600 seconds = 1 hour
    const privilegeExpiredTs = currentTimeStamp + expiration_time_in_seconds;    
    const { channelName } = req.query;

    if (!channelName) {

        return res.status(400).json({ "error": "Channel name is required" }).send();
    }

    const key = RtcTokenBuilder.buildTokenWithUid(app_id, app_certificate, channelName, "0", RtcRole.PUBLISHER, privilegeExpiredTs);
    return res.json({ "key": key }).send();
})

app.listen(port, () => console.log(`server is up at port at ${port}`));