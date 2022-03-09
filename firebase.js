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
import { getStorage, ref, getBytes, uploadBytes, getDownloadURL} from "firebase/storage";

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
const pathReference = ref(storage, 'TestPictures/BerryPic1.png');
uploadBytes(pathReference)

export {auth, db, storage, pathReference};
export default getFirestore(app);
//Test comment from Jeremy