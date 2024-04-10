import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_APIKEY,
    authDomain: import.meta.env.VITE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_PROJECTID,
    storageBucket: import.meta.env.VITE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_APPID,
    measurementId: import.meta.env.VITE_MEASUREMENTID,
};
console.log(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);
getToken(messaging, {
    vapidKey: import.meta.env.VAPIDKEY,
})
    .then((currentToken) => {
        if (currentToken) {
            // Send the token to your server and update the UI if necessary
            // ...
            console.log('currentToken:', currentToken);
        } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.');
            // ...
        }
    })
    .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
    });
