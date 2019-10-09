const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gymSchema = new Schema(
    {
        _id: Schema.Types.ObjectId,
        company: String,
        name: String,
        formattedAddress: String,
        lat: Number,
        lng: Number,

        user: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    },
    {
        timestamps: true
    }
);

const Gym = mongoose.model('Gym', gymSchema);

module.exports = Gym;
