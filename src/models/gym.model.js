const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// const User = require('./type');

const gymSchema = new Schema(
    {
        company: String,
        name: String,
        formattedAddress: String,
        lat: Number,
        lng: Number,

        user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    },
    {
        timestamps: true
    }
);

const Gym = mongoose.model('Gym', gymSchema);

module.exports = Gym;
