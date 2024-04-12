import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Firebase 프로젝트 설정
// Firebase Console에서 프로젝트 설정을 확인하고 아래에 복사해 넣으세요
// 설정 값은 클라이언트에서 노출이 되도 상관은 없다고 하는데 다른 복잡한 방법을 사용해서 숨기기도 가능하다고 합니다
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
// Firebase Messaging 인스턴스 생성
const messaging = getMessaging(app);

// 사용자에게 알림 권한을 요청하는 함수
export async function requestNotificationPermission() {
    console.log('Requesting permission...');
    const permission = await Notification.requestPermission();
    // Notification.requestPermission()은 Promise를 반환함 granted / denied / default 중 하나
    // granted: 사용자가 알림을 허용함
    // denied: 사용자가 알림을 거부함
    // default: 사용자가 알림 허용을 거부하거나 브라우저가 알림 허용을 지원하지 않음
    if (permission === 'granted') {
        console.log('Notification permission granted.');
        // 알림 권한을 허용받으면 토큰을 발급받음
        await getFirebaseToken();
    } else {
        console.log('Unable to get permission to notify.');
    }
}

// 토큰을 가져오는 함수
export async function getFirebaseToken() {
    // 알림 토큰을 가져옴
    const fcmToken = await getToken(messaging, {
        // vapidKey는 Firebase Console에서 프로젝트 설정 > 클라우드 메시징 > 웹 구성 메뉴에서 확인 가능
        // vapidkey를 사용해 fcm push 서버에 클라이언트를 등록하고 토큰을 발급받아 서버로 전송해서 사용함
        vapidKey: import.meta.env.VAPIDKEY,
    });
    if (fcmToken) {
        console.log('token:', fcmToken);
        // 토큰을 서버로 전송하여 알림을 보낼 수 있도록 함

        // 포그라운드 알림 수신
        onMessage(messaging, (payload) => {
            // payload는 알림 메시지의 데이터를 가지고 있음
            console.log('Foreground Message received. ', payload);

            // 알림을 표시하는 코드
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
