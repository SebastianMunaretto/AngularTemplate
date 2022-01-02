const User = require('../models/user')

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


    return router;
}