importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: 'AIzaSyBjHpYykXfglKuHedA625gKrEQsHtPiLgQ',
    authDomain: 'fcm-test-4a789.firebaseapp.com',
    projectId: 'fcm-test-4a789',
    storageBucket: 'fcm-test-4a789.appspot.com',
    messagingSenderId: '661055039703',
    appId: '1:661055039703:web:15908d793c8c51f277a892',
    measurementId: 'G-W06W62HXXN',
});
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
