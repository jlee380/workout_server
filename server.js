const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const user = require('./src/routes/user');

const app = express();

// Bodyparser Middelware
app.use(bodyParser.json());
app.use(cors());
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

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
