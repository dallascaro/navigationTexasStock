// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getDatabase, set } from "firebase/database";
import { getStorage, ref, getBytes, uploadBytes, getDownloadURL, uploadBytesResumable} from "firebase/storage";
import React, { useState, useEffect } from 'react';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDssIjaRA10PTXk6pAB6uGmWMQcUxVv6ZE",
  authDomain: "texasstockrally-aaae6.firebaseapp.com",
  projectId: "texasstockrally-aaae6",
  storageBucket: "texasstockrally-aaae6.appspot.com",
  messagingSenderId: "933861967827",
  appId: "1:933861967827:web:c2d224866fee91f51d1126"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig);
}else {
  app = firebase.app()
}

// Authentication
const auth = firebase.auth()

// Firestore database
const db = getFirestore();

//Storage
const storage = getStorage(app);

export {auth, db, storage};
export default getFirestore(app);