/* eslint-disable no-undef */

import Spin from './helpers/spinner';
import { htmlHelper } from './helpers/htmlHelper';
import alertifyjs from 'alertifyjs';

const spinner = new Spin();
const travelData = {};

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

const scrollToTheLatestTrip = () => {
    const footer = document.querySelector('.post-card-footer');
    footer.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' });
};


/**
* Restore favorite trips - local storage approach
* @description Favorite trips checker
* @returns {Void}
*/
const checkFavoriteTrips = () => {
    const travelDataStorage = localStorage.getItem('travelData') ? JSON.parse(localStorage.getItem('travelData')) : [];
    if (travelDataStorage.length) {
        travelDataStorage.forEach((travelDataStorageItem) => {
            travelDataStorageItem.favorite = true;
            // Restore in memory object with favorites - preferable to use server for this but this is an approach with local storage
            travelData[travelDataStorageItem.id] = travelDataStorageItem;

            // Re-create cards with trips
            createCard(travelDataStorageItem);
        });
    }
};

/**
* Add event handlers for the heart(favorite) and trash(remove) icons
* @description Event handler
* @param {String} locationName - depart location
* @param {String} id - specific id to store travelData info(geoNamesData, weatherBitData, pixabayData etc.)
* @returns {Void}
*/
const addHeartSaveButtonHandler = (locationName, id) => {
    const heartButton = document.querySelector(`[data-js-id="${locationName}"]`);
    const trashButton = document.querySelector(`[data-js-trash-id="${locationName}"]`);

    heartButton.addEventListener('click', () => {
        if (heartButton.classList.contains('fa-solid')) {
            // change heart icon to the one with empty heart
            heartButton.outerHTML = `<i class="far fa-heart fa-lg" data-js-id=${locationName}></i>`;

            // Notify users about removing trip from favorites
            alertifyjs.set('notifier', 'position', 'top-right');
            alertifyjs.notify(`<b>You have removed this trip from your favorites</b> <i class="fa-regular fa-face-surprise"></i>`, 'error', 3);

            //  Get data from localStorage
            const travelDataArray = localStorage.getItem('travelData') ? JSON.parse(localStorage.getItem('travelData')) : [];
            const index = travelDataArray.findIndex((item) => item.id === `${id}`);
            if (index > -1) {
                // remove info about specific trip from the localStorage as we won't need it anymore
                travelDataArray.splice(index, 1);
                localStorage.setItem(`travelData`, JSON.stringify(travelDataArray));
            }
        } else {
            // change heart icon to the one with full heart
            heartButton.outerHTML = `<i class="fa-solid fa-heart fa-lg" data-js-id=${locationName}></i>`;

            // Notify users about adding trip to favorites
            alertifyjs.set('notifier', 'position', 'top-right');
            alertifyjs.notify(`<b>You have added this trip to your favorites</b> <i class="fa-solid fa-hands-clapping"></i>`, 'success', 3);

            //  Get data from localStorage
            const travelDataArray = localStorage.getItem('travelData') ? JSON.parse(localStorage.getItem('travelData')) : [];
            const travelDataObj = travelData[id];
            if (travelDataArray.length) {
                // add info about specific trip to the localStorage as we will need it after page reload
                travelDataArray.push(travelDataObj);
                localStorage.setItem(`travelData`, JSON.stringify(travelDataArray));
            } else {
                // add info about specific trip to the local storage for the first time
                travelDataObj && Object.keys(travelDataObj).length && localStorage.setItem(`travelData`, JSON.stringify([travelDataObj]));
            }
        }
        addHeartSaveButtonHandler(locationName, id);
    }, { once: true });

    // Element will be removed from the DOM but not from the local storage
    // If we want to remove card completely we'll need to remove it fist from the favorites
    trashButton.addEventListener('click', () => {
        const section = document.querySelector(`[data-js-section-id="${locationName}"]`);
        nestedGrid.removeChild(section);
    });
};

/**
* Creates card-trip for a particular trip
* @description createCard - card-trip handler
* @param {Object} - destructed object with all the travel data we need to build up trip-card
* @returns {Void}
*/
const createCard = ({id, currentLocation, geoNamesData, weatherBitData, pixabayData, timeDiffDays, favorite}) => {
    const { locationName, countryName } = geoNamesData;
    // eslint-disable-next-line prefer-destructuring
    const today = new Date().toISOString().split('T')[0];

    const fragment = new DocumentFragment();
    const section = document.createElement('section');
    section.classList.add('post-card-container-section');
    section.setAttribute('data-js-section-id', locationName && locationName.split(' ').join(''));
    fragment.appendChild(section);
    const div1 = document.createElement('div');
    div1.classList.add('post-card-container');
    section.appendChild(div1);
    if(locationName) {
        const p1 = document.createElement('p');
        p1.classList.add('post-card-badge');
        p1.innerHTML = `My Trip: <b>${currentLocation.toUpperCase()} to ${locationName.toUpperCase()}</b> <i class="fa-solid fa-suitcase"></i>`;
        div1.appendChild(p1);
        const p2 = document.createElement('p');
        if(locationName === countryName) {
            p2.innerHTML = `<i class="fa-solid fa-earth-europe"></i> <b>${locationName}</b>`;
        } else {
            p2.innerHTML = `<i class="fa-solid fa-earth-europe"></i> <b>${locationName}</b></br>
            <i class="fa-solid fa-earth-oceania"></i> Country - <b>${countryName}</b>`;
        }
        div1.appendChild(p2);
        const p3 = document.createElement('p');
        p3.innerHTML = `<i class="fa-solid fa-ruler"></i> Length of the trip - <b>${timeDiffDays}</b> ${timeDiffDays > 1 ? '<b>days</b>' : '<b>day</b>'}`;
        div1.appendChild(p3);
        const p4 = document.createElement('p');
        p4.innerHTML = `<i>${today}</i>`;
        div1.appendChild(p4);
        const figure = document.createElement('figure');
        figure.innerHTML = `<img src="${pixabayData.largeImageURL}" alt=${locationName}" loading="lazy">
        <figcaption>${locationName} Photo</figcaption>`;
        div1.appendChild(figure);
        const div2 = document.createElement('div');
        div2.classList.add('post-card-link-section');
        div2.innerHTML = htmlHelper(weatherBitData);
        div1.appendChild(div2);
        const div3 = document.createElement('div');
        div3.classList.add('post-card-social-icons');
        if (favorite) {
            div3.innerHTML = `<i class="fa-solid fa-heart fa-lg" data-js-id=${locationName.split(' ').join('')}>
            </i> <i class="fa-regular fa-trash-can" data-js-trash-id=${locationName.split(' ').join('')}></i>`;
        } else {
            div3.innerHTML = `<i class="far fa-heart fa-lg" data-js-id=${locationName.split(' ').join('')}></i> 
            <i class="fa-regular fa-trash-can" data-js-trash-id=${locationName.split(' ').join('')}></i>`;
        }
        div1.appendChild(div3);
    }

    nestedGrid.appendChild(fragment);

    locationName && addHeartSaveButtonHandler(locationName.split(' ').join(''), id);
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
    const currentLocation = travelFormData.get('currentLocation').toLowerCase();
    const travelLocation = travelFormData.get('travelLocation').toLowerCase();
    const departDate = new Date(travelFormData.get('depart'));
    const returnDate = new Date(travelFormData.get('return'));
    const timeDiffDays = (returnDate.getTime() - departDate.getTime()) / (1000 * 3600 * 24) || 1;

    const geoNamesData = await Client.getGeoNamesData(travelLocation);
    const weatherBitData = await Client.getWeatherbitData(geoNamesData, timeDiffDays);
    const pixabayData = await Client.getPixabayData(travelLocation);
    const { locationName, countryName } = geoNamesData;

    const travelDataObj = {
        id: travelLocation + currentLocation,
        currentLocation,
        geoNamesData,
        weatherBitData,
        pixabayData,
        timeDiffDays,
    };

    if((travelLocation+currentLocation in travelData)) {
        alertifyjs.set('notifier','position', 'top-right');
        alertifyjs.notify(`<b>You have already added trip to this location</b> <i class="fa-solid fa-circle-arrow-right"></i> 
        <b><i>${currentLocation.toUpperCase()}-${travelLocation.toUpperCase()}<i></b>`, 'error', 5 );
    } else if (!locationName && !countryName) {
        alertifyjs.set('notifier','position', 'top-right');
        alertifyjs.notify(`<b>Sorry your input location is wrong - Please enter a correct location</b></br><i class="fa-solid fa-skull-crossbones"></i></br>
        <b><i>Entered location is <i class="fa-solid fa-circle-chevron-right"></i>:</br>
         ${travelLocation.toUpperCase()}<i></b>`, 'error', 5 );
    } else {
        travelData[travelLocation + currentLocation] = travelDataObj;
        createCard(travelDataObj);
        // Small timeout in order to let images render before scroll to the bottom
        setTimeout(() => {
            scrollToTheLatestTrip();
        }, 100);
    }

    spinner.stop();
    travelForm.reset();
};

document.addEventListener('DOMContentLoaded', () => {
    travelForm.addEventListener('submit', handleSubmit);
    handleDatePicker();
    checkFavoriteTrips();
});

export { handleSubmit };

