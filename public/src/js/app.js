var deferredPrompt;

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        // can also add scope as a param in the register promise
        .register('/sw.js')
        .then(function() {
            console.log('service worker registered.')
        })
        .catch(function(err) {
            console.log(err);
        });
}

// this is for the install prompt
window.addEventListener('beforeinstallprompt', function(event) {
    console.log('beforeinstallprompt fired')
    event.preventDefault();
    deferredPrompt = event;
    return false;
})



