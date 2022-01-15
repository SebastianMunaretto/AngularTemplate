const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs');

let emailLengthChecker = (email) => {
    if (!email) {
        return false;
    } else {
        if (email.length < 5 || email.length > 30) {
            return false;
        } else {
            return true;
        }
    }
}

let validEmailChecker = (email) => {
    if(!email) {
        return false;
    } else {
        const regExp = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
        return regExp.test(email);
    }
} 

const emailValidators = [
    {
        validator: emailLengthChecker, message: 'E-mail must be at least 5 chars but no more than 30'
    },
    {
        validator: validEmailChecker, message: 'Must be a valid email'
    }
]

let usernameLengthChecker = (username) => {
    if(!username){
        return false;
    } else {
        if(username.length < 3 || username.length > 15){
            return false;
        }else {
            return true;
        }
    }
}

let validUsername = (username) => {
    if(!username){
        return false;
    } else {
        const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
        return regExp.test(username);
    }
}

const usernameValidators = [
    {
        validator: usernameLengthChecker, message: "Username must be longer that 3 and smaller than 15 chars"
    },
    {
        validator: validUsername, message: "Username is invalid"
    }
]

let passwordLengthChecker = (password) => {
    if(!password) {
        return false;
    }else {
        if (password.length < 8 || password.length > 35){
            return false
        } else {
            return true;
        }
    }
}

let validPassword = (password) => {
    if(!password){
        return false;
    } else {
        // at least one letter and one number
        const regExp = new RegExp("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]");
        return regExp.test(password);
    }
}

const passwordValidators = [
    {
        validator: passwordLengthChecker, message: 'Password must be at least 8 chars long and no more than 35'
    },
    {
        validator: validPassword, message: 'Password needs to have at least one letter and one number'
    }
]

const userSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidators },
    username: { type: String, required: true, unique: true, lowercase: true, validate: usernameValidators },
    password: { type: String, required: true, validate: passwordValidators }
});


// before it gets saved it hashes password
userSchema.pre('save', function (next) {
    // only runs if the password is set/modified
    if (!this.isModified('password')) {
        console.log("Test");
        return (next);
    }

    bcrypt.hash(this.password, null, null, (err, hash) => {
        if (err) {
            return next(err);
        }
        this.password = hash;
        next();
    });
});

// returns bool definig if password is equal or not
userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);
