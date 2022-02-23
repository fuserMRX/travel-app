import { getApiKey } from './api';
import { WeatherbitKeyURL } from './constants';

const WeatherbitCurrentUrl = `https://api.weatherbit.io/v2.0/current?`;
const WeatherbitForecastUrl = `https://api.weatherbit.io/v2.0/forecast/daily?`;

/**
* Get data from the Weatherbit API
* @description Weatherbit API extractor
* @param {Object} geoNamesData - GeoNames lat and lng
* @param {string} timeDiffDays - number of days from departure till return
* @returns {Object} - weather data
*/
const getWeatherbitData = async (geoNamesData, timeDiffDays) => {
    const { lat, lng } = geoNamesData;
    if (lat && lng) {
        let url = '';
        let application_key = '';
        let parsedWeatherInfo = {};
        try {
            // Get API key
            application_key = await getApiKey(WeatherbitKeyURL);


            if (timeDiffDays > 7) {
                url = `${WeatherbitForecastUrl}lat=${lat}&lon=${lng}&days=${timeDiffDays}&key=${application_key}`;
            } else {
                url = `${WeatherbitCurrentUrl}lat=${lat}&lon=${lng}&key=${application_key}`;
            }

            const weatherInfoData = await fetch(url);
            parsedWeatherInfo = await weatherInfoData.json();
        } catch (e) {
            console.log(e);
            return {
                error: true,
                message: `Failed to fetch`
            };
        }

        const { data } = parsedWeatherInfo;
        const { app_temp, temp, clouds, slp, snow, weather } = data && data.length && data[0] || {};
        return {
            'Feels like temperature': app_temp,
            'Current temperature': temp,
            'Clouds Coverage': clouds,
            'Sea Level Pressure': slp,
            'Snowfall': snow,
            'Weather': weather.description,
        };
    }
};

export { getWeatherbitData };