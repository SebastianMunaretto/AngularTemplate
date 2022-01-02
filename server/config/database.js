// creates our secret
const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
    uri: 'mongodb://localhost:27017/course-database',
    secret: crypto,
    db: 'course-database'
}