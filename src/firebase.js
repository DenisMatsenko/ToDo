import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import "firebase/compat/database"

// var firebaseConfig = {
//   apiKey: "AIzaSyDO7HNc-SdrPgyGaqScbeY0tGFQhC_IxpI",
//   authDomain: "fbtest-1-eb4bc.firebaseapp.com",
//   databaseURL: "https://fbtest-1-eb4bc-default-rtdb.firebaseio.com",
//   projectId: "fbtest-1-eb4bc",
//   storageBucket: "fbtest-1-eb4bc.appspot.com",
//   messagingSenderId: "614668429474",
//   appId: "1:614668429474:web:904a9d8d72569f01228ffb"
// };

// firebase.initializeApp(firebaseConfig);
// const databaseRef = firebase.database().ref() 
// export const myRef = databaseRef.child("myRef")
// export default firebase

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/database"

var firebaseConfig = {
  apiKey: "AIzaSyBgW7bHtq02poDieD3wPaXjxd3DDAZiYNo",
  authDomain: "todoapp-ee772.firebaseapp.com",
  projectId: "todoapp-ee772",
  storageBucket: "todoapp-ee772.appspot.com",
  messagingSenderId: "472046002245",
  appId: "1:472046002245:web:340c2eeb8487feb6dc832c"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)
export const auth = getAuth(app)

const provider = new  GoogleAuthProvider() 

export const SignInwithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("then")
      localStorage.setItem("name", result.user.displayName)
      localStorage.setItem("email", result.user.email)
      localStorage.setItem("img", result.user.photoURL)
    })
}