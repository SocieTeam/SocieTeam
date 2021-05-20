  import firebase from 'firebase/app';
  import 'firebase/storage';
  
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: process.env.REACT_APP_FB_API,
    authDomain: process.env.REACT_APP_FB_authDomain,
    projectId: process.env.REACT_APP_FB_projectId,
    storageBucket: process.env.REACT_APP_FB_storageBucket,
    messagingSenderId: process.env.REACT_APP_FB_messaging,
    appId: process.env.REACT_APP_FB_appId,
    measurementId: "G-VC7BV5LH84"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const imageStorage = firebase.storage();

  export { imageStorage };