const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gymSchema = new Schema(
	{
		company: 'string',
		gymId: 'string',
		location: {
			gymId: 'string',
			lat: 0.0,
			long: 0.0,
			street: 'string',
			secondaryStree: 'string',
			postalCode: 'string',
			city: 'string',
			country: 'string',
			province: 'string'
		}
	},
	{
		timestamps: true
	}
);

const Gym = mongoose.model('Gym', gymSchema);

module.exports = Gym;
