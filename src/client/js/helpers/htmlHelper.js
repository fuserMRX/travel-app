const htmlHelper = (paramObj) => {
    let finalString = '';
    if (Object.keys(paramObj).length) {
        finalString += '<ul>';
        for (const key of Object.keys(paramObj)) {
            console.log(key, paramObj[key]);
            if (key === 'Length of the trip' && paramObj[key] !== undefined && paramObj[key] !== null) {
                finalString += `<li><i class="fa-solid fa-ruler"></i> ${key} - <strong>${paramObj[key]}</strong></li>`;
            }
            if (key === 'Weather' && paramObj[key] !== undefined && paramObj[key] !== null) {
                finalString += `<li><i class="fa-solid fa-sun"></i></i> ${key} - <strong>${paramObj[key]}</strong></li>`;
            }
            if ((key === 'Feels like temperature' && paramObj[key] !== undefined && paramObj[key] !== null)
                || (key === 'Current temperature' && paramObj[key] !== undefined && paramObj[key] !== null)) {
                finalString += `<li><i class="fa-solid fa-temperature-high"></i> ${key} - <strong>${paramObj[key]}</strong></li>`;
            }
            if (key === 'Clouds Coverage' && paramObj[key] !== undefined && paramObj[key] !== null) {
                finalString += `<li><i class="fa-solid fa-cloud"></i> ${key} - <strong>${paramObj[key]}</strong></li>`;
            }
            if (key === 'Sea Level Pressure' && paramObj[key] !== undefined && paramObj[key] !== null) {
                finalString += `<li><i class="fa-solid fa-water"></i> ${key} - <strong>${paramObj[key]}</strong></li>`;
            }
            if (key === 'Snowfall' && paramObj[key] !== undefined && paramObj[key] !== null) {
                finalString += `<li><i class="fa-solid fa-snowflake"></i> ${key} - <strong>${paramObj[key]}</strong></li>`;
            }
        }
        finalString += `</ul>`;
        return finalString;
    }
    return finalString;
};

export {
    htmlHelper
};