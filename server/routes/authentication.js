const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database')

module.exports = (router) => {

    router.post('/register', (req, res) => {
        // checks if user provided right data
        if (!req.body.email) {
            res.json({ sucess: false, message: 'You must provide an e-mail' })
        } else {
            if (!req.body.username) {
                res.json({ sucess: false, message: 'You must provide a username' });
            } else {
                if (!req.body.password) {
                    res.json({ sucess: false, message: 'You must provide a password' });
                } else {
                    // from mongoose Schemas
                    let user = new User({
                        email: req.body.email.toLowerCase(),
                        username: req.body.username.toLowerCase(),
                        password: req.body.password
                    });
                    // saves into our db
                    user.save((err) => {
                        if (err) {
                            if (err.code == 11000) {
                                res.json({ sucess: false, message: 'Username or e-mail already exists' })
                            } else {
                                if (err.errors) {
                                    if (err.errors.email) {
                                        res.json({ sucess: false, message: err.errors.email.message })
                                    } else {
                                        if (err.errors.username) {
                                            res.json({ sucess: false, message: err.errors.username.message })
                                        } else {
                                            if (err.errors.password) {
                                                res.json({ sucess: false, message: err.errors.password.message })
                                            }
                                        }
                                    }
                                } else {
                                    // Should never get to this error
                                    res.json({ sucess: false, message: err });
                                }
                            }
                        } else {
                            res.json({ sucess: true, message: 'Account was registered' })
                        }
                    });
                }
            }
        }
    });

    router.post('/login', (req, res) => {
        if (!req.body.username) {
            res.json({ success: false, message: 'No username was provided' });
        } else {
            if (!req.body.password) {
                res.json({ success: false, message: 'No password was provided.' });
            } else {
                User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
                    if (err) {
                        res.json({ success: false, message: err });
                    } else {
                        if (!user) {
                            res.json({ success: false, message: 'Username not found.' });
                        } else {
                            const validPassword = user.comparePassword(req.body.password);
                            if (!validPassword) {
                                res.json({ success: false, message: 'Password invalid' });
                            } else {
                                const token = jwt.sign({ userID: user._id }, config.secret, { expiresIn: "24h" });
                                // response passes token
                                res.json({ sucess: true, message: "Sucesss!", token: token, user: { username: user.username } });
                            }
                        }
                    }
                });
            }
        }
    });

    router.use((req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) {
            res.json({ sucess: false, message: "No token provided" });
        } else {
            // checks if expiered
            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    res.json({ sucess: false, message: 'Token invalid:' + err });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        }
    });

    router.get('/profile', (req,res) => {
        User.findOne({_id: req.decoded.userID}).select('email username').exec((err, user) => {
            if (err){
                res.json({sucess: false, messages: err});
            } else {
                if (!user) {
                    res.json({sucess: false, message: 'User not found'});
                } else {
                    // send back the user
                    res.json({sucess: true, user: user})
                }
            }
        });
    });

    return router;
}