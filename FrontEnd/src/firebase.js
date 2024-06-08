// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgQOVRzwsCNMjLbHiWmpq-HhJ_8LfSG6Y",
  authDomain: "hello-milky-shop.firebaseapp.com",
  projectId: "hello-milky-shop",
  storageBucket: "hello-milky-shop.appspot.com",
  messagingSenderId: "707812339764",
  appId: "1:707812339764:web:a9061cfb939677ada75a61",
  measurementId: "G-P2C7QBS81N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
