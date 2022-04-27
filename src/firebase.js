import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// import { initializeApp } from "firebase/app";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import {
    getAuth,
} from "firebase/auth";
import {
    getFirestore, orderBy,increment
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
   updateDoc, arrayUnion, arrayRemove,onSnapshot,
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
  const storage = getStorage(app);


  export {auth, db , signInWithPopup, GoogleAuthProvider, signOut,query,onSnapshot,
    getDocs,
    collection,
    where,
    setDoc,
    getDoc,
    dbCollection,
    doc , updateDoc, arrayUnion, arrayRemove,ref, uploadBytes,increment, getDownloadURL,firebase,orderBy, storage};