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

const messaging = firebase.messaging();

// 백그라운드 상태에서 메시지 수신
messaging.onBackgroundMessage(function (payload) {
    // 여기에 알림 메시지 처리 코드를 추가
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
});
