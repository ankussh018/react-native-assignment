import { initializeApp, getApp } from "@react-native-firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDEEyVfC7WaPbk87W5ZTQTO6VxFbZO0hc4",
    authDomain: "assignment-t01.firebaseapp.com",
    databaseURL: "https://assignment-t01-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "assignment-t01",
    storageBucket: "assignment-t01.appspot.com",
    messagingSenderId: "1051718902034",
    appId: "1:1051718902034:web:5353da1f31980e44e1d3cb",
    measurementId: "G-TN7QFF4PTS"
};

// Initialize Firebase
let app = getApp();
// const app = initializeApp(firebaseConfig)

if (!app) {
    app = initializeApp(firebaseConfig);
} else { initializeApp(firebaseConfig) }

console.log(app)

export default app;