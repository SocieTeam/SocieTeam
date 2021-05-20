  import firebase from 'firebase/app';
  import 'firebase/storage';
  
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyC_MuQLGMAHhwHYhd9_8LMXddO31pfooik",
    authDomain: "societeam-b90d7.firebaseapp.com",
    projectId: "societeam-b90d7",
    storageBucket: "societeam-b90d7.appspot.com",
    messagingSenderId: "309516992725",
    appId: "1:309516992725:web:1c1ae7a062169aa349e25c",
    measurementId: "G-VC7BV5LH84"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const imageStorage = firebase.storage();

  export { imageStorage };