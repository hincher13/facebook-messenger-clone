import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyByB-bJXy_Gy5ma1Dv3BGt2JjGvf5nkP6Q",
        authDomain: "facebook-messenger-clone-b896b.firebaseapp.com",
        databaseURL: "https://facebook-messenger-clone-b896b-default-rtdb.firebaseio.com",
        projectId: "facebook-messenger-clone-b896b",
        storageBucket: "facebook-messenger-clone-b896b.appspot.com",
        messagingSenderId: "435953691360",
        appId: "1:435953691360:web:e0c2cc0ad26656f6b5be85",
        measurementId: "G-GEGFGFS3QR"
});

const db = firebaseApp.firestore();

export default db;