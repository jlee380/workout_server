const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usersSchema = new Schema(
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

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;
