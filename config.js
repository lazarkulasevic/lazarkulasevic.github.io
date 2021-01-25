var firebaseConfig = {
  apiKey: "AIzaSyD8WWYS3AQlWgbgVaA7kqAlNEHWZg72xtY",
  authDomain: "lazar-kulasevic.firebaseapp.com",
  databaseURL: "https://lazar-kulasevic.firebaseio.com",
  projectId: "lazar-kulasevic",
  storageBucket: "lazar-kulasevic.appspot.com",
  messagingSenderId: "102103216132",
  appId: "1:102103216132:web:2fd7e4365ab147cdf2c551",
  measurementId: "G-K9N72QX1FQ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
var db = firebase.firestore();

export default db;