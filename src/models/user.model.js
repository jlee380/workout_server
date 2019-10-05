const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        username: String,
        email: String,
        firstName: String,
        lastName: String,
        gender: 0
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
