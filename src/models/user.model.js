const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        userId: 'string',
        username: 'string',
        email: 'string',
        firstName: 'string',
        // lastName: 'string',
        gender: 0
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
