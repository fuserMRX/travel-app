/* eslint-disable no-undef */

import Spin from './helpers/spinner';
import { htmlHelper } from './helpers/htmlHelper';

const spinner = new Spin();

const travelForm = document.querySelector('.weather-form-data');
const nestedGrid = document.querySelector('.post-card-nestedGrid');

/**
* Enable datepicker only for the present and future dates
* @description DatePicker disabler
* @returns {Void}
*/
const handleDatePicker = () => {
    // eslint-disable-next-line prefer-destructuring
    const today = new Date().toISOString().split('T')[0];
    document.querySelector('#depart').setAttribute('min', today);
    document.querySelector('#return').setAttribute('min', today);
};

const addHeartSaveButtonHandler = () => {
    let heartButton = document.querySelector('.far.fa-heart') || document.querySelector('.fa-solid.fa-heart');
    heartButton.addEventListener('click', () => {
        if (heartButton.classList.contains('fa-solid')) {
            heartButton.outerHTML = `<i class="far fa-heart fa-lg"></i>`;
            addHeartSaveButtonHandler();
        } else {
            heartButton.outerHTML = `<i class="fa-solid fa-heart fa-lg"></i>`;
            addHeartSaveButtonHandler();
        }
    }, { once: true });
};

const createCard = (geoNamesData, weatherBitData, pixabayData, timeDiffDays) => {
    const { locationName } = geoNamesData;
    // eslint-disable-next-line prefer-destructuring
    const today = new Date().toISOString().split('T')[0];

    const fragment = new DocumentFragment();
    const section = document.createElement('section');
    section.classList.add('post-card-container-section');
    fragment.appendChild(section);
    const div1 = document.createElement('div');
    div1.classList.add('post-card-container');
    section.appendChild(div1);
    const p1 = document.createElement('p');
    p1.classList.add('post-card-badge');
    p1.innerHTML = `<b>My Trip</b> <i class="fa-solid fa-suitcase"></i>`;
    div1.appendChild(p1);
    const h3 = document.createElement('h3');
    h3.innerHTML = `<i class="fa-solid fa-earth-europe"></i> <b>${locationName}</b>`;
    div1.appendChild(h3);
    const p2 = document.createElement('p');
    p2.innerHTML = `<i class="fa-solid fa-ruler"></i> Length of the trip - <b>${timeDiffDays}</b> ${timeDiffDays > 1 ? '<b>days</b>' : '<b>day</b>'}`;
    div1.appendChild(p2);
    const p3 = document.createElement('p');
    p3.innerHTML = `<i>${today}</i>`;
    div1.appendChild(p3);
    const figure = document.createElement('figure');
    figure.innerHTML = `<img src="${pixabayData.largeImageURL}" alt=${locationName}">
    <figcaption>${locationName} Photo</figcaption>`;
    div1.appendChild(figure);
    const div2 = document.createElement('div');
    div2.classList.add('post-card-link-section');
    div2.innerHTML = htmlHelper(weatherBitData);
    div1.appendChild(div2);
    const div3 = document.createElement('div');
    div3.classList.add('post-card-social-icons');
    div3.innerHTML = `<i class="far fa-heart fa-lg"></i> `;
    div1.appendChild(div3);

    nestedGrid.appendChild(fragment);

    addHeartSaveButtonHandler();
};

/**
* Handle trael form submit
* @description handle form submitter
* @param {Object} event - DOM event
* @returns {Void}
*/
const handleSubmit = async (event) => {
    event.preventDefault();

    spinner.target = document.body;
    spinner.start();

    const travelFormData = new FormData(travelForm);
    const travelLocation = travelFormData.get('travelLocation');
    const departDate = new Date(travelFormData.get('depart'));
    const returnDate = new Date(travelFormData.get('return'));
    const timeDiffDays = (returnDate.getTime() - departDate.getTime()) / (1000 * 3600 * 24);

    const geoNamesData = await Client.getGeoNamesData(travelLocation);
    const weatherBitData = await Client.getWeatherbitData(geoNamesData, timeDiffDays);
    const pixabayData = await Client.getPixabayData(travelLocation);

    createCard(geoNamesData, weatherBitData, pixabayData, timeDiffDays);

    spinner.stop();
    travelForm.reset();
};

document.addEventListener('DOMContentLoaded', () => {
    travelForm.addEventListener('submit', handleSubmit);

    handleDatePicker();
});

export { handleSubmit };

