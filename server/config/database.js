const crypto = require('crypto').randomBytes(256).toString('hex');
require('dotenv').config({path: './.env'});

module.exports = {
    uri: "mongodb://localhost:27017/" + process.env.DB_NAME,
    secret: crypto,
    db: process.env.DB_NAME
}