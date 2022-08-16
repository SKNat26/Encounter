// FIREBASE for SUBMISSIONS
const submissionFirebaseConfig = {
    apiKey: "AIzaSyANXH7eZZNhd5WbArGpfnmipJJG1TrbxUE",
    authDomain: "animal-sightings-reports.firebaseapp.com",
    databaseURL: "https://animal-sightings-reports-default-rtdb.firebaseio.com",
    projectId: "animal-sightings-reports",
    storageBucket: "animal-sightings-reports.appspot.com",
    messagingSenderId: "1056172154951",
    appId: "1:1056172154951:web:7b46976a1ee7486d651162",
    measurementId: "G-ZTVH6HV2Z7"
  };
  
let reports = firebase.initializeApp(submissionFirebaseConfig, "reports");

const submissionDatabase = firebase.database(reports).ref();
  