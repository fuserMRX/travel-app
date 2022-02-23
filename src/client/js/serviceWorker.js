/* eslint-disable no-undef */
const serviceWorker = (function () {
    let serviceWorkerIsDefined = false;
    document.addEventListener('DOMContentLoaded', function () {
        if ('serviceWorker' in navigator) {
            console.log('PRODUCTION is ==>', PRODUCTION);
            if (PRODUCTION) {
                serviceWorkerIsDefined = true;
                console.log('ServiceWorker is ==>', serviceWorkerIsDefined);
                // Use the window load event to keep the page load performant
                window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/service-worker.js');
                });
            } else {
                console.log('ServiceWorker is ==>', serviceWorkerIsDefined);
            }
        }
    });
}());

export { serviceWorker };