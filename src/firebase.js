import firebase from "firebase/app";
import "firebase/firestore";

const firebaseApp = firebase.initializeApp({
  //config info
  apiKey: "AIzaSyD7FzMzfTc7Vq2arm863fcPl2skSVE8Dd8",
  authDomain: "react-todo-app-35b59.firebaseapp.com",
  projectId: "react-todo-app-35b59",
  storageBucket: "react-todo-app-35b59.appspot.com",
  messagingSenderId: "780542149938",
  appId: "1:780542149938:web:2d488e94d9b12b46cf832b",
  measurementId: "G-QZGLC4RHQS",
});

const db = firebaseApp.firestore();

export default db;
