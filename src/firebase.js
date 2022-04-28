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
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
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