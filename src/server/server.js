// eslint-disable-next-line no-unused-vars
const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const PORT = 3000;

const geoNamesData = {};
const weatherbitData = {};
const pixabayData = {};

const API_KEYS = {
    weatherbit_api_key: process.env.WEATHERBIT_API_KEY,
    pixabay_api_key: process.env.PIXABAY_API_KEY,
};


// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
// We don't need to use body-parser anymore => https://expressjs.com/en/api.html#express.urlencoded, https://expressjs.com/en/api.html#express.json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));


// Setup Server
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

app.get('/weatherbitKey', function (req, res) {
    res.send(API_KEYS.weatherbit_api_key);
});

app.get('/pixabayKey', function (req, res) {
    res.send(API_KEYS.pixabay_api_key);
});

app.get('/getWeatherbitData', (req, res) => {
    res.send(weatherbitData);
});
app.get('/getPixabayData', (req, res) => {
    res.send(pixabayData);
});

app.post('/saveGeoNamesData', (req, res) => {
    const { temperature, date, userResponse } = req.body;
    // projectData = {
    //     temperature,
    //     date,
    //     userResponse
    // };
    res.send('GeoNamesData has been successfully added');
});
app.post('/saveWeatherbitData', (req, res) => {
    const { temperature, date, userResponse } = req.body;
    // projectData = {
    //     temperature,
    //     date,
    //     userResponse
    // };
    res.send('WeatherbitData has been successfully added');
});
app.post('/savePixabayData', (req, res) => {
    const { temperature, date, userResponse } = req.body;
    // projectData = {
    //     temperature,
    //     date,
    //     userResponse
    // };
    res.send('PixabayData has been successfully added');
});