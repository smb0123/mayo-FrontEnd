// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyAfFEA0BEEym6ULH_v-e-QlAY6rNNb1eDk',
  authDomain: 'mayo-app-280d4.firebaseapp.com',
  projectId: 'mayo-app-280d4',
  storageBucket: 'mayo-app-280d4.appspot.com',
  messagingSenderId: '292349774898',
  appId: '1:292349774898:web:ef1723f06398d19bfbc02b',
});

const messaging = firebase.messaging();
