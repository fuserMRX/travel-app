import { getApiKey } from './api';
import { PixabayKeyURL } from './constants';

const PixabayBaseUrl = `https://pixabay.com/api/?key=`;

const getPixabayData = async (travelLocation) => {
    if (travelLocation) {
        // Get API key
        const application_key = await getApiKey(PixabayKeyURL);

        const requestUrl = `${PixabayBaseUrl}${application_key}&q=${encodeURIComponent(travelLocation)}&image_type=photo`;
        const pixabayData = await fetch(requestUrl);
        const parsedPixabayData = await pixabayData.json();
        const { hits } = parsedPixabayData;
        const { largeImageURL } = hits.length && hits[0];
        return { largeImageURL };
    }
};

export { getPixabayData };