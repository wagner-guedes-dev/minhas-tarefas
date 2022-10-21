import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyArpYi91adtqJJA8GfSj0HS4RxlwjNkWJU",
    authDomain: "curso-fbf12.firebaseapp.com",
    projectId: "curso-fbf12",
    storageBucket: "curso-fbf12.appspot.com",
    messagingSenderId: "977146402766",
    appId: "1:977146402766:web:f91b82640bf3404cfb7d9f",
    measurementId: "G-EVYPR7JJPB"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const db = getFirestore(firebaseApp)
  const auth = getAuth(firebaseApp)

  export { db, auth }