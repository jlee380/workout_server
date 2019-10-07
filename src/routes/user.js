const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const User = require('../models/user.model');

// Gettging all users in a database
router.get('/', (req, res, next) => {
    User.find()
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

// Getting a user by id
router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
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

// Adding a user to a database
router.post('/add', (req, res, next) => {
    const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender
    });

    newUser
        .save()
        .then(result => {
            console.log('this is req.body', req.body);
            res.status(201).json({
                message: 'Handling user registration',
                registedUser: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

// Adding a gym to a user
router.post('/:userId', (req, res, next) => {
    const gymId = req.body.gymId;
    const userId = req.params.userId;

    User.findByIdAndUpdate(userId, { $push: { gym: gymId } })
        .exec()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling add gym to user',
                registedGym: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err.message });
        });
});

// REFECTORING

// router.patch('/:userId', (req, res, next) => {
//     const id = req.params.userId;
//     const updateOperation = {};
//     for (const paramter of req.body) {
//         updateOperation[paramter.propName] = operation.value;
//     }

//     User.update({ _id: id }, { $set: updateOperation })
//         .exec()
//         .then(result => {
//             console.log(result);
//             res.status(200).json(result);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             });
//         });
// });

// Deleting a user by id
router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.remove({ _id: id })
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
