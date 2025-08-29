// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "task-ticker-jxb6s",
  "appId": "1:82408074358:web:0dd0065cf67b364cb4c357",
  "storageBucket": "task-ticker-jxb6s.firebasestorage.app",
  "apiKey": "AIzaSyDf2_A9Wbvm-ik14sTWibZsifs7gmHHylw",
  "authDomain": "task-ticker-jxb6s.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "82408074358"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
