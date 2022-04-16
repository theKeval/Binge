import firebase from 'firebase/compat/app';
import { getFirestore } from 'firebase/firestore';
import 'firebase/compat/auth';
import Constants from 'expo-constants';
import {  getApp } from 'firebase/app';

// Initialize Firebase
const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId
};

let Firebase;
Firebase = firebase.initializeApp(firebaseConfig);
export default Firebase;
export const auth = Firebase.auth();
export const db = getFirestore(Firebase);
export const appFB = getApp();