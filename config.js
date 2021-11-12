if(process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    dotenv.config();
}

module.exports = {

    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    app_id: process.env.API_ID,
    app_certificate: process.env.API_CERTIFICATE,
    expiration_time_in_seconds: process.env.EXPIRATION_TIME_IN_SECONDS
};