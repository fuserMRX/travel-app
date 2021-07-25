const PORT = 3000;

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');

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
app.use(express.static('website'));


// Setup Server
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

app.get('/getProjectData', (req, res) => {
    res.send(projectData);
});

app.post('/saveProjectData', (req, res) => {
    const { temperature, date, userResponse } = req.body;
    projectData = {
        temperature,
        date,
        userResponse
    };
    res.send('Data has been successfully added');
});