// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
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
const db = getFirestore(app);

//Storage
// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(app);
// Create a storage reference from our storage service
const storageRef = ref(storage);

const pathReference = ref(storage, 'TestPictures/BerryPic1.png');
// Create a reference from an HTTPS URL
// Note that in the URL, characters are URL escaped!
const pathReference2 = ref(storage, 'gs://texasstockrally-aaae6.appspot.com/assests/ProfilePicture/profilePic.png');

//Create a reference to upload pic
const profilePicRef = ref(storage, 'assests/ProfilePicture/profilePic.png');

// Create file variable
const fileUpload = 'assests/ProfilePicture/profilePic.png';

// Upload the file and metadata
const uploadTask = uploadBytesResumable(profilePicRef, fileUpload);

uploadBytes(pathReference)

// Create a reference to pull jeremys pic
const jeremyPic = ref(storage, 'gs://texasstockrally-aaae6.appspot.com/TestPictures/demon1.jpg');

export {auth, db, storage, pathReference2, profilePicRef, jeremyPic};
export default getFirestore(app);
//Test comment from Jeremy