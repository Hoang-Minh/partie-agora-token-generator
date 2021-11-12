const express = require("express");
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');
const app = express();

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();    
}

// routes
app.get("/api/agora/rtcToken", (req, res) => {

    const currentTimeStamp = Math.floor(Date.now() / 1000);
    // token expire time, hardcode to 3600 seconds = 1 hour
    const privilegeExpiredTs = currentTimeStamp + process.env.EXPIRATION_TIME_IN_SECONDS;    
    const { channelName } = req.query;

    if (!channelName) {

        return res.status(400).json({ "error": "Channel name is required" }).send();
    }

    const key = RtcTokenBuilder.buildTokenWithUid(process.env.API_ID, process.env.API_CERTIFICATE, channelName, 0, RtcRole.PUBLISHER, privilegeExpiredTs);
    return res.json({ "key": key }).send();
})

app.listen(process.env.PORT, () => console.log(`server is up at port at ${process.env.PORT}`));