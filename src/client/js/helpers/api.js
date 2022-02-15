const ajaxHelper = async (url) => {
    let responseInfo = null;
    const response = await (fetch(url))
        .catch((err) => {
            console.error(err);
        });
    if (response instanceof Object) {
        responseInfo = await response.text();
        return responseInfo;
    }
    responseInfo = await response;
    return responseInfo;
};

const getApiKey = async (keyURL) => {
    const apiKeyInfo = await ajaxHelper(keyURL);
    return apiKeyInfo || '';
};


export {
    ajaxHelper,
    getApiKey,
};