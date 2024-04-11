import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_APIKEY,
    authDomain: import.meta.env.VITE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_PROJECTID,
    storageBucket: import.meta.env.VITE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_APPID,
    measurementId: import.meta.env.VITE_MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export async function requestNotificationPermission() {
    console.log('Requesting permission...');
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
        console.log('Notification permission granted.');
        await getFirebaseToken();
    } else {
        console.log('Unable to get permission to notify.');
    }
}

export async function getFirebaseToken() {
    const fcmToken = await getToken(messaging, {
        vapidKey: import.meta.env.VAPIDKEY,
    });
    if (fcmToken) {
        console.log('token:', fcmToken);

        onMessage(messaging, (payload) => {
            console.log('Foreground Message received. ', payload);
            // ...
            new Notification(payload.notification?.title ?? 'Default Title', {
                body: payload.notification?.body,
            });
        });
    } else {
        // 알림 표시 권한을 허락 받아야 함
        console.log('No registration token available. Request permission to generate one.');
        requestNotificationPermission();
    }
}
