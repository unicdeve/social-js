const mongoose = require('mongoose');
const uuidvi = require('uuid');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    hashed_password: {
        type: String,
        trim: true,
        required: true
    },
    salt: String,
    creted: {
        type: Date,
        default: Date.now
    },
    updated: Date
});


// Virtual field
userSchema.virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = uuidvi()
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    })

// methods
userSchema.methods = {
    encryptPassword: function(password) {
        if(!password) return "";
        try {
            return crypto.createHmac('sha256', this.salt)
                .update(password)
                .digest('hex')
        } catch(e) {
            return "";
        }
    }
}


module.exports = mongoose.model("User", userSchema);