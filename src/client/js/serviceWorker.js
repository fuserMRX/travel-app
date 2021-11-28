/* eslint-disable no-undef */
const serviceWorker = (function () {
    let serviceWorkerIsDefined = false;
    document.addEventListener('DOMContentLoaded', function () {
        if ('serviceWorker' in navigator) {
            console.log('PRODUCTION is ==>', PRODUCTION);
            if (PRODUCTION) {
                serviceWorkerIsDefined = true;
                // Use the window load event to keep the page load performant
                window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/service-worker.js');
                });
            }
        }
    });
    console.log('ServiceWorker is ==>', serviceWorkerIsDefined);
    return serviceWorkerIsDefined;
}());

export { serviceWorker };