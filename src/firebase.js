import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// import { initializeApp } from "firebase/app";

import {
    getAuth,
} from "firebase/auth";
import {
    getFirestore,
} from "firebase/firestore";

import {
  GoogleAuthProvider,

  signInWithPopup,
  signOut,
} from "firebase/auth";

import {

  query,
  getDocs,
  collection,
  where,
  setDoc,
  getDoc,
  doc,
} from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyCd-AMCJQlCgArTzLNDBDArEADCb1710wE",
    authDomain: "practicum-2-c7bca.firebaseapp.com",
    projectId: "practicum-2-c7bca",
    storageBucket: "practicum-2-c7bca.appspot.com",
    messagingSenderId: "534022382787",
    appId: "1:534022382787:web:84e584bbc6290630bcae76"
  };


  // const firebaseApp = firebase.initializeApp(firebaseConfig);

  // const db = firebaseApp.firestore();

  const app = firebase.initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  const dbCollection = app.firestore();


  export {auth, db , signInWithPopup, GoogleAuthProvider, signOut,query,
    getDocs,
    collection,
    where,
    setDoc,
    getDoc,
    dbCollection,
    doc,};