import { getApiKey } from './api';
import { PixabayKeyURL } from './constants';

const PixabayBaseUrl = `https://pixabay.com/api/?key=`;

const getImage = async (application_key, travelLocation) => {
    const requestUrl = `${PixabayBaseUrl}${application_key}&q=${encodeURIComponent(travelLocation)}&image_type=photo`;
    const pixabayData = await fetch(requestUrl);
    const parsedPixabayData = await pixabayData.json();
    const { hits } = parsedPixabayData;
    const { largeImageURL } = hits.length && hits[0];
    return largeImageURL;
};

const getPixabayData = async (travelLocation) => {
    if (travelLocation) {
        let largeImageURL = '';
        try {
            // Get API key
            const application_key = await getApiKey(PixabayKeyURL);

            largeImageURL = await getImage(application_key, travelLocation);
            if (largeImageURL === undefined) {
                largeImageURL = await getImage(application_key, 'placeholder');
            }
        } catch (e) {
            console.log(e);
        }
        return { largeImageURL };
    }
};

export { getPixabayData };