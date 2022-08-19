require('dotenv').config();

const config = {
    isVercel: process.env.IS_VERCEL || false,
    mongoUri: process.env.MONGODB_URI,
    port: process.env.PORT || 8000,
    mongoOptions: {
        user: process.env.MONGODB_USERNAME,
        pass: process.env.MONGODB_PASSWORD,
        dbName: process.env.MONGODB_DATABASE,
    },
};

module.exports = config;