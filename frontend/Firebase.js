import { getAuth, GithubAuthProvider } from 'firebase/auth'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "os-matchmaker.firebaseapp.com",
    projectId: "os-matchmaker",
    storageBucket: "os-matchmaker.firebasestorage.app",
    messagingSenderId: "568172117484",
    appId: "1:568172117484:web:a06de4c678ffcc62eb94c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GithubAuthProvider()

export { auth, provider }


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyB7xNOBvJDBCUxvv8VPYa8QgN7m3sYnwBQ",
//   authDomain: "os-matchmaker.firebaseapp.com",
//   projectId: "os-matchmaker",
//   storageBucket: "os-matchmaker.firebasestorage.app",
//   messagingSenderId: "568172117484",
//   appId: "1:568172117484:web:a06de4c678ffcc62eb94c9",
//   measurementId: "G-RGCHN95CVV"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);