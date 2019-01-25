import firebase from "firebase";

// Initialize Firebase
var config = {
  apiKey: process.env.EACT_APP_FB_API_KEY,
  authDomain: "mapbox-geo.firebaseapp.com",
  databaseURL: "https://mapbox-geo.firebaseio.com",
  projectId: "mapbox-geo",
  storageBucket: "mapbox-geo.appspot.com",
  messagingSenderId: "385045373914"
};
firebase.initializeApp(config);
const db = firebase.database();

export default db;
