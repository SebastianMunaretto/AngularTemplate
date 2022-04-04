require('dotenv').config({path: './.env'});

module.exports = {
    uri: "mongodb://localhost:27017/" + process.env.DB_NAME,
    secret: process.env.SECRET,
    db: process.env.DB_NAME
}