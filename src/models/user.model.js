const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        _id: Schema.Types.ObjectId,
        username: String,
        email: String,
        firstName: String,
        lastName: String,
        gender: 0,

        gym: [{ type: Schema.Types.ObjectId, ref: 'Gym' }]
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
