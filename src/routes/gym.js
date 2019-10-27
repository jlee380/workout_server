const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Gym = require('../models/gym.model');
const Users = require('../models/users.model');

// Getting all gyms in a database
router.get('/', (req, res, next) => {
    Gym.find()
        .populate('users')
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

// Getiing a gym by id
router.get('/:gymId', (req, res, next) => {
    const id = req.params.gymId;
    Gym.findById(id)
        .populate('users')
        .exec()
        .then(doc => {
            console.log('This is from database', doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: 'No vaild user' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

// Adding a user to a gym
router.post('/:gymId', (req, res, next) => {
    const gymId = req.params.gymId;
    const userId = req.body.userId;

    Gym.findOne({ _id: gymId }, (err, gym) => {
        // Checking if there is already the user in the gym
        const registeredUser = gym.users.filter(user => {
            return user._id === userId;
        });

        if (registeredUser.length === 0) {
            Gym.findByIdAndUpdate(gymId, { $push: { users: userId } })
                .exec()
                .then(result => {
                    console.log(result);

                    res.status(201).json({
                        message: 'Handling add a user to a gym',
                        registedGym: result
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ error: err.message });
                });
            Users.findByIdAndUpdate(userId, { $push: { gym: gymId } })
                .exec()
                .then(result => {
                    console.log(result);
                    res.status(201).json({
                        message: 'Handling add a gym to a user',
                        registedGym: result
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ error: err.message });
                });
        } else {
            res.status(404).json({ message: 'User exists' });
        }
    });
});

// Adding a gym to database
router.post('/', (req, res, next) => {
    const newGym = new Gym({
        _id: new mongoose.Types.ObjectId(),
        company: req.body.company,
        name: req.body.name,
        formattedAddress: req.body.formattedAddress,
        lat: req.body.lat,
        lng: req.body.lng
    });

    newGym
        .save()
        .then(result => {
            console.log('this is req.body', req.body);
            res.status(201).json({
                message: 'Handling gym registration',
                registedGym: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.delete('/:gymId', (req, res, next) => {
    const gymId = req.params.gymId;

    Gym.remove({ _id: gymId })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;
