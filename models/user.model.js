const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minlength: 10
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    userStatus: {
        type: String,
        required: true,
        default: "APPROVED"
    },
    userType: {
        type: String,
        required: true,
        default: "CUSTOMER"
    }
})

module.exports = mongoose.model("User", userSchema);