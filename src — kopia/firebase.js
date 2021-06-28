import firebase from "firebase";

const firebaseApp =firebase.initializeApp({
    
        apiKey: "AIzaSyA9foM0-PbCa2XBdzTEtlX8eLtYIzarLwc",
        authDomain: "clony1337-2137.firebaseapp.com",
        projectId: "clony1337-2137",
        storageBucket: "clony1337-2137.appspot.com",
        messagingSenderId: "197931133050",
        appId: "1:197931133050:web:bba7a4672ac3b159bcf3c3"


});

const db = firebaseApp.firestore();


export default db;