import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCZwb826H9ydShkXYWhyKLb492H8VsLPLM",
  authDomain: "alec-site-37512.firebaseapp.com",
  databaseURL: "https://alec-site-37512.firebaseio.com",
  projectId: "alec-site-37512",
  storageBucket: "alec-site-37512.appspot.com",
  messagingSenderId: "888547797832",
  appId: "1:888547797832:web:7cab553a7a6439a48ba17d",
  measurementId: "G-10CJ6YRXFC"
});

const db = firebaseApp.firestore();

export { db };