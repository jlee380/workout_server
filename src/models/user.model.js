const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: String,
        email: String,
        firstName: String,
        lastName: String,
        gender: 0,

        gym: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Gym' }]
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
