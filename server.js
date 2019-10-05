const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

require('dotenv').config();

const user = require('./src/routes/user');

const app = express();
// Bodyparser Middelware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

app.use('/user', user);

app.use((req, res, next) => {
    const error = new Error('not found');
    error.ststus = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
