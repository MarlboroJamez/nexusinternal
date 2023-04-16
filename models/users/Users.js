const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name."]
    },
    pic: {
        type: String,
    },
    surname: {
        type: String,
        required: [true, "Please provide your surname."]
    },
    email: {
        type: String,
        required: [true, "Please provide your email address."],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 10,
        select: false,
    },
    role: {
        type: String,
        required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isTeamAdmin: {
        type: Boolean,
        default: false,
    },
    isExport:{
        type: Boolean,
        default: true,
    },
    isReporting: {
        type: Boolean,
        default: true,
    },
    isDirectory: {
        type: Boolean,
        default: true,
    },
    isAnalysis: {
        type: Boolean,
        default: true,
    },
    isActivity: {
        type: Boolean,
        default: false,
    },
    isScheduled: {
        type: Boolean,
        default: true,
    },
    isRegular: {
        type: Boolean,
        default: true,
    },
    creation: Date,
    sessionId: String,
    valid: Boolean,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    accessibility: Boolean,
    package: [],
    license: [],
});

//MIDDLEWARE
UserSchema.pre("save", async function(next){
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.creation = Date.now();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//METHODS
UserSchema.methods.matchPasswords = async function(password){
    return await bcrypt.compare(password, this.password);
}

UserSchema.methods.getSignedToken = function(){
    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        sessionId: this._id,
        isAdmin: this.isAdmin
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

UserSchema.methods.getRefreshToken = function(){
    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        sessionId: this._id,
        isAdmin: this.isAdmin
    }, process.env.JWT_REFRESH_TOKEN, {
        expiresIn: process.env.JWT_REFRESH_EXPIRE
    })
}

UserSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

    return resetToken;
}

const User = mongoose.model("Users", UserSchema);

module.exports = User;