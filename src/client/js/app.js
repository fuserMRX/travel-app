// Open Weather API example
// api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
// https://openweathermap.org/current

/* Global Variables */
// OpenWeather API key
const APIKey = '830acfcd949b7f3dbfcaa08c4baccb1d';
const BaseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const submitButton = document.querySelector('#generate');
const zip = document.querySelector('#zip');
const feelings = document.querySelector('#feelings');
const dateUI = document.querySelector('#date');
const temperatureUI = document.querySelector('#temp');
const contentUI = document.querySelector('#content');

const getUserInputInfo = () => {
    return {
        'zip': zip.value,
        'feelings': feelings.value,
    };
};

const getWeatherInfo = async () => {
    const defaultZip = '85001';
    const { zip } = getUserInputInfo();
    const requestZIP = zip || defaultZip;
    const requestUrl = `${BaseUrl}${requestZIP}&units=metric&appid=${APIKey}`;
    const response = await fetch(requestUrl);
    try {
        const responseData = await response.json();
        console.log(responseData);
        return responseData;
    } catch (error) {
        console.log(error);
    }
};

const saveProjectData = async (url, userData) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    try {
        const responseData = await response.text();
        console.log(responseData);
    } catch (error) {
        console.log(error);
    }
};

const getProjectData = async (url) => {
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    try {
        const responseData = await response.json();
        updateUI(responseData);
    } catch (error) {
        console.log(error);
    }
};

const updateUI = (dataUI) => {
    const { temperature, date, userResponse } = dataUI;
    dateUI.innerHTML = `Date is ${date}` || '';
    temperatureUI.innerHTML = `Temperature is ${temperature} &#8451` || '';
    contentUI.innerHTML = userResponse ? `Users mood is => ${userResponse}` : '';

    // Clear input fields
    zip.value = '';
    feelings.value = '';
};



const updateWeatherJournalApp = async () => {
    getWeatherInfo()
        .then((data) => {
            const { main } = data || {};
            const { temp: temperature } = main || {};
            const { feelings: userResponse } = getUserInputInfo();
            // Create a new date instance dynamically with JS
            let date = new Date();
            date = `${(date.getMonth() + 1)}/${date.getDate()}/${date.getFullYear()}`;
            saveProjectData('http://localhost:3000/saveProjectData', { temperature, date, userResponse })
                .then(() => {
                    getProjectData('http://localhost:3000/getProjectData');
                });
        });
};


submitButton.addEventListener('click', updateWeatherJournalApp);


