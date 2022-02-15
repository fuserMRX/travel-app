// With the parameter 'fuzzy' the GeoNames search will find results even if the search terms are incorrectly spelled
const GeoNamesBaseUrl1 = `https://secure.geonames.org/searchJSON?q=`;
const GeoNamesBaseUrl2 = `&fuzzy=0.8&maxRows=1&style=short&username=vortex84`;

/**
* Get data from the geoNames API
* @description geoNames API extractor
* @param {string} travelLocation - location
* @returns {Object} - data with longitude and latitude
*/
const getGeoNamesData = async (travelLocation) => {
    const url = `${GeoNamesBaseUrl1}${encodeURIComponent(travelLocation)}${GeoNamesBaseUrl2}`;
    const response = await fetch(url);
    const geoNamesData = await response.json();
    const { geonames } = geoNamesData;
    // eslint-disable-next-line prefer-destructuring
    const { lat, lng, name } = geonames.length && geonames[0] || {};
    return {
        lat, lng, locationName: name
    };
};

export { getGeoNamesData };